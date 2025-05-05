import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Editor() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }
      try {
        const res = await fetch('http://localhost:3001/api/posts/my/', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (!res.ok) throw new Error('Error al obtener posts');
        const data = await res.json();
        setPosts(data);
      } catch (err) {
        setError('No se pudieron cargar los posts');
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, [navigate]);

  const handleEdit = (id) => {
    // Redirige a la página de edición (a crear)
    navigate(`/edit/${id}`);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Seguro que quieres borrar este post?')) return;
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`http://localhost:3001/api/posts/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        setPosts(posts.filter(post => post.id !== id));
      } else {
        alert('Error al borrar el post');
      }
    } catch {
      alert('Error de red');
    }
  };

  const handleAdd = () => {
    navigate('/add');
  };

  if (loading) return <div className="container mt-5">Cargando...</div>;
  if (error) return <div className="container mt-5 alert alert-danger">{error}</div>;

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Mis Posts</h2>
        <button className="btn btn-primary" onClick={handleAdd}>Añadir nuevo post</button>
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Título</th>
            <th>Descripcion</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {posts.length === 0 ? (
            <tr><td colSpan="3">No tienes posts.</td></tr>
          ) : posts.map(post => (
            <tr key={post.id}>
              <td>{post.titulo}</td>
              <td>{post.descripcion}</td>
              <td>
                <button className="btn btn-sm btn-warning me-2" onClick={() => handleEdit(post.id)}>Editar</button>
                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(post.id)}>Borrar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Editor;
