import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Register from './Register';
import Login from './Login';

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <nav style={{ marginBottom: 20 }}>
        <Link to="/register" style={{ marginRight: 10 }}>Registro</Link>
        <Link to="/login">Login</Link>
      </nav>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={
          <div>
            <h1>Bienvenido a la app</h1>
            <p>Usa el menú para registrarte o iniciar sesión.</p>
          </div>
        } />
      </Routes>
    </Router>
  )
}

export default App
