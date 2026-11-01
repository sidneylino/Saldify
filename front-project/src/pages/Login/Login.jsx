import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../../services/userService';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    try {
      const response = await login(email, password);

      localStorage.setItem('token', response.data.token);

      navigate('/home');
    } catch (error) {
      console.error(error);
      setError('E-mail ou senha inválidos. Tente novamente.');
    }
  };

  return (
    <div className="container d-flex align-items-center justify-content-center min-vh-100">
      <form
        onSubmit={handleSubmit}
        className="card p-4 p-md-5 shadow"
        style={{ width: '100%', maxWidth: '400px' }}
      >
        <h1 className="text-center mb-2">Bem-vindo de volta!</h1>

        <p className="text-muted text-center mb-4">
          Entre na sua conta para acessar suas finanças.
        </p>

        {error && (
          <div className="alert alert-danger py-2" role="alert">
            {error}
          </div>
        )}

        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            E-mail
          </label>

          <input
            id="email"
            type="email"
            className="form-control"
            placeholder="seu@email.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            autoComplete="email"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="form-label">
            Senha
          </label>

          <input
            id="password"
            type="password"
            className="form-control"
            placeholder="Digite sua senha"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="current-password"
            required
          />
        </div>

        <button type="submit" className="btn btn-success w-100 py-2 mb-3">
          Entrar
        </button>

        <p className="text-center text-muted mb-0">
          Ainda não tem uma conta?{' '}
          <Link to="/signup" className="text-success fw-semibold text-decoration-none">
            Cadastre-se
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
