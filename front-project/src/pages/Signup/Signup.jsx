import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signup } from '../../services/userService';

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const navigate = useNavigate();

  async function handleSignup(event) {
    event.preventDefault();

    try {
      await signup(name, email, password);

      alert("Cadastro realizado com sucesso!");
      navigate('/');
    } catch (err) {
      alert("Erro ao cadastrar. Verifique os dados ou se o e-mail já existe.");
    }
  }

  return (
    <div className="container d-flex align-items-center justify-content-center min-vh-100">
      <form onSubmit={handleSignup} className="card p-4 shadow" style={{ width: '400px' }}>
        <h1 className="text-center mb-4">Criar Conta</h1>

        <div className="mb-3">
          <label className="form-label">Nome</label>
          <input 
            type="text" 
            className="form-control" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required 
          />
        </div>

        <div className="mb-3">
          <label className="form-label">E-mail</label>
          <input 
            type="email" 
            className="form-control" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Senha</label>
          <input 
            type="password" 
            className="form-control" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>

        <button type="submit" className="btn btn-success w-100 mb-3">
          Cadastrar
        </button>

        <Link to="/" className="text-center d-block">
          Já tem uma conta? Faça Login
        </Link>
      </form>
    </div>
  );
}

export default Signup;