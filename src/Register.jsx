import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { apiRegister } from './apiService';

function Register() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await apiRegister(form);
      const data = await res.json();
      if (res.ok) {
        setMessage('Usuario registrado con éxito');
        setTimeout(() => navigate('/login'), 1000); // Redirige tras 1 segundo
      } else setMessage(data.message || 'Error al registrar');
    } catch (err) {
      setMessage('Error de red');
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: 400 }}>
      <h2 className="mb-4">Registro</h2>
      <form onSubmit={handleSubmit} className="border p-4 rounded bg-light">
        <div className="mb-3">
          <input name="username" className="form-control" placeholder="Usuario" value={form.username} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <input name="password" type="password" className="form-control" placeholder="Contraseña" value={form.password} onChange={handleChange} required />
        </div>
        <button type="submit" className="btn btn-primary w-100">Registrarse</button>
        <Link to="/login" style={{ marginRight: 10 }}>Si ya tienes usuario, accede</Link>

      </form>
      {message && <div className="alert alert-info mt-3">{message}</div>}
    </div>
  );
}

export default Register;
