
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { getOne, update } from '../../services/userService';

function Profile() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const loadUser = async () => {
        try {
            const userId = localStorage.getItem('userId');
            const response = await getOne(userId);
            const data = response.data;
            setName(data.data.name);
            setEmail(data.data.email);
            } catch (error) {
            setError('Erro ao carregar dados do usuário.');
        }
    };

    loadUser();
  }, []);


  const handleSubmit = async (event) => {
    event.preventDefault();

    setError('');
    setSuccess('');

    try {
        const userId = localStorage.getItem('userId');

        const userData = {
            name,
            email,
        };

        await update(userId, userData);

        setSuccess('Perfil atualizado com sucesso!');

    } catch (error) {
        setError('Erro ao atualizar perfil.');
    }
  };

  return (
    <div className="container py-4">
      <div className="row justify-content-center">
        <div className="col-md-7 col-lg-6">

          <div className="mb-4">
            <Link to="/home" className="text-decoration-none text-muted">
              ← Voltar
            </Link>

            <h1 className="h3 mt-3">Editar perfil</h1>
            <p className="text-muted">
              Atualize suas informações pessoais.
            </p>
          </div>

          <div className="card shadow-sm border-0">
            <div className="card-body p-4">

              <form onSubmit={handleSubmit}>

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

                <hr />

                {error && (
                  <div className="alert alert-danger py-2">
                    {error}
                  </div>
                )}

                {success && (
                  <div className="alert alert-success py-2">
                    {success}
                  </div>
                )}

                <div className="d-flex justify-content-end gap-2 mt-4">
                  <Link to="/home" className="btn btn-light border">
                    Cancelar
                  </Link>

                  <button type="submit" className="btn btn-success">
                    Salvar alterações
                  </button>
                </div>

              </form>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Profile;
