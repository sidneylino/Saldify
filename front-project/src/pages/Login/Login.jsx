import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../../services/userService';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    try {
      const response = await login(email, password);

      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userId', response.data.user.id);

      navigate('/home');
    } catch (error) {
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

        <div className="input-group">
          <input
            id="password"
            type={showPassword ? 'text' : 'password'}
            className="form-control"
            placeholder="Digite sua senha"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="current-password"
            required
          />

          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
          >
            {showPassword ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                fill="none" viewBox="0 0 24 24" stroke="currentColor"
                strokeWidth="1.8">
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="M3 3l18 18M10.6 10.6a2 2 0 002.8 2.8" />
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="M9.9 5.2A10.8 10.8 0 0112 5c5 0 8.5 4.5 9.5 7-.4 1-1.2 2.2-2.3 3.3M6.2 6.2C3.8 7.8 2.5 10 2 12c1 2.5 4.5 7 10 7 1.1 0 2.1-.2 3-.5" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                fill="none" viewBox="0 0 24 24" stroke="currentColor"
                strokeWidth="1.8">
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            )}
          </button>
        </div>
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
