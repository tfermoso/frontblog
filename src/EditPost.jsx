import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { apiGetPostById, apiEditPost } from './apiService';

function EditPost() {
  const [form, setForm] = useState({ titulo: '', descripcion: '' });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
    const fetchPost = async () => {
      try {
        const res = await apiGetPostById(id, token);
        if (!res.ok) throw new Error('No se pudo cargar el post');
        const data = await res.json();
        setForm({ titulo: data.titulo, descripcion: data.descripcion });
      } catch {
        setMessage('Error al cargar el post');
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id, navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      const res = await apiEditPost(id, form, token);
      if (res.ok) {
        setMessage('Post actualizado con éxito');
        setTimeout(() => navigate('/editor'), 1000);
      } else {
        const data = await res.json();
        setMessage(data.message || 'Error al actualizar el post');
      }
    } catch {
      setMessage('Error de red');
    }
  };

  if (loading) return <div className="container mt-5">Cargando...</div>;

  return (
    <div className="container mt-5" style={{ maxWidth: 600 }}>
      <h2 className="mb-4">Editar Post</h2>
      <form onSubmit={handleSubmit} className="border p-4 rounded bg-light">
        <div className="mb-3">
          <input name="titulo" className="form-control" placeholder="Título" value={form.titulo} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <textarea name="descripcion" className="form-control" placeholder="Descripción" value={form.descripcion} onChange={handleChange} required rows={4} />
        </div>
        <button type="submit" className="btn btn-warning w-100">Actualizar Post</button>
      </form>
      {message && <div className="alert alert-info mt-3">{message}</div>}
    </div>
  );
}

export default EditPost;
