
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as transactionService from '../../services/transactionService';
import './Home.css';
import { getOne } from '../../services/userService';

function Home() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [name, setName] = useState('');

  // Filtros de data
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const loadTransactions = async () => {
      try {
        const response = await transactionService.getAll();
        const data = response.data;
        const list = Array.isArray(data) ? data : data?.transactions || [];

        setTransactions(list);
      } catch (err) {
        console.error('Erro ao buscar transações:', err);
        setError('Não foi possível carregar as transações.');
      } finally {
        setLoading(false);
      }
    };

    loadTransactions();
  }, []);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const userId = localStorage.getItem('userId');
        const response = await getOne(userId);
        const data = response.data;

        setName(data.data.name);
      } catch (error) {
        console.error('Erro ao buscar usuário:', error);
        setError('Erro ao carregar dados do usuário.');
      }
    };

    loadUser();
  }, []);

  const formatCurrency = (value) => {
    return Number(value || 0).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  };

  const isIncome = (transaction) => transaction.type === 'income';

  // Indicadores financeiros considerando todas as transações
  const totalIncome = transactions
    .filter(isIncome)
    .reduce(
      (total, transaction) => total + Number(transaction.amount || 0),
      0
    );

  const totalExpenses = transactions
    .filter((transaction) => transaction.type === 'expense')
    .reduce(
      (total, transaction) => total + Number(transaction.amount || 0),
      0
    );

  const balance = totalIncome - totalExpenses;

  // Filtragem e ordenação das transações
  const filteredTransactions = [...transactions]
    .filter((transaction) => {
      const date = transaction.transaction_date;

      if (startDate && date < startDate) return false;
      if (endDate && date > endDate) return false;

      return true;
    })
    .sort((a, b) =>
      b.transaction_date.localeCompare(a.transaction_date)
    );

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      'Tem certeza que deseja excluir esta transação?'
    );

    if (!confirmed) return;

    try {
      await transactionService.remove(id);

      setTransactions((previousTransactions) =>
        previousTransactions.filter((transaction) => transaction.id !== id)
      );

      if (selectedTransaction?.id === id) {
        setSelectedTransaction(null);
      }
    } catch (err) {
      console.error('Erro ao excluir transação:', err);
      setError('Não foi possível excluir a transação.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    sessionStorage.removeItem('token');

    navigate('/');
  };

  return (
    <div className="container py-4">
      <header className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="h3 mb-1">Painel financeiro de {name}</h1>
          <p className="text-muted mb-0">
            Acompanhe suas finanças em um só lugar.
          </p>
        </div>

        <div className="d-flex align-items-center gap-2">
          <Link to="/transactions/new" className="btn btn-success">
            + Nova transação
          </Link>

          <div className="position-relative">
            <button
              type="button"
              className="btn btn-light border rounded-circle profile-button"
              onClick={() => setProfileMenuOpen(!profileMenuOpen)}
              aria-label="Menu do perfil"
              aria-expanded={profileMenuOpen}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="8" r="4" />
                <path d="M5 21a7 7 0 0 1 14 0" />
              </svg>
            </button>

            {profileMenuOpen && (
              <>
                <div
                  className="profile-backdrop"
                  onClick={() => setProfileMenuOpen(false)}
                />

                <div className="profile-dropdown shadow">
                  <Link
                    to="/profile/edit"
                    className="profile-menu-item"
                    onClick={() => setProfileMenuOpen(false)}
                  >
                    <i className="bi bi-person-gear"></i>
                    Editar perfil
                  </Link>

                  <hr className="my-1" />

                  <button
                    type="button"
                    className="profile-menu-item text-danger w-100"
                    onClick={handleLogout}
                  >
                    <i className="bi bi-box-arrow-right"></i>
                    Sair
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Resumo financeiro */}
      <div className="row g-3 mb-4">
        <div className="col-12 col-md-4">
          <div className="card h-100">
            <div className="card-body">
              <p className="text-muted mb-2">Saldo total</p>
              <h2 className="h4 mb-0">{formatCurrency(balance)}</h2>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-4">
          <div className="card h-100">
            <div className="card-body">
              <p className="text-muted mb-2">Receitas</p>
              <h2 className="h4 text-success mb-0">
                {formatCurrency(totalIncome)}
              </h2>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-4">
          <div className="card h-100">
            <div className="card-body">
              <p className="text-muted mb-2">Despesas</p>
              <h2 className="h4 text-danger mb-0">
                {formatCurrency(totalExpenses)}
              </h2>
            </div>
          </div>
        </div>
      </div>

      <div className="row g-3">
        {/* Transações */}
        <div className="col-12 col-lg-8">
          <div className="card h-100">
            <div className="card-body">
              <h2 className="h5 mb-3">Transações</h2>

              {/* Filtros de data */}
              <div className="row g-2 mb-3">
                <div className="col-12 col-md-5">
                  <label className="form-label">Data inicial</label>
                  <input
                    type="date"
                    className="form-control"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </div>

                <div className="col-12 col-md-5">
                  <label className="form-label">Data final</label>
                  <input
                    type="date"
                    className="form-control"
                    value={endDate}
                    min={startDate || undefined}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </div>

                <div className="col-12 col-md-2 d-flex align-items-end">
                  <button
                    type="button"
                    className="btn btn-outline-secondary w-100"
                    onClick={() => {
                      setStartDate('');
                      setEndDate('');
                    }}
                  >
                    Limpar
                  </button>
                </div>
              </div>

              {loading && (
                <p className="text-muted">Carregando transações...</p>
              )}

              {!loading && error && (
                <p className="text-danger">{error}</p>
              )}

              {!loading && !error && filteredTransactions.length === 0 && (
                <p className="text-muted mb-0">
                  {transactions.length === 0
                    ? 'Nenhuma transação encontrada.'
                    : 'Nenhuma transação encontrada nesse período.'}
                </p>
              )}

              {!loading && !error && filteredTransactions.length > 0 && (
                <div className="table-responsive">
                  <table className="table align-middle mb-0">
                    <thead>
                      <tr>
                        <th>Categoria</th>
                        <th className="text-end">Valor</th>
                        <th className="text-end">Data</th>
                        <th className="text-end">Ações</th>
                      </tr>
                    </thead>

                    <tbody>
                      {filteredTransactions.map((transaction) => (
                        <tr key={transaction.id}>
                          <td>
                            {transaction.category || 'Sem categoria'}
                          </td>

                          <td
                            className={`text-end ${
                              isIncome(transaction)
                                ? 'text-success'
                                : 'text-danger'
                            }`}
                          >
                            {isIncome(transaction) ? '' : '-'}
                            {formatCurrency(transaction.amount)}
                          </td>

                          <td className="text-end">
                            {new Date(
                              transaction.transaction_date + 'T00:00:00'
                            ).toLocaleDateString('pt-BR')}
                          </td>

                          <td className="text-end text-nowrap">
                            <button
                              type="button"
                              className="btn btn-sm btn-outline-secondary me-2"
                              onClick={() =>
                                setSelectedTransaction(transaction)
                              }
                            >
                              Ver descrição
                            </button>

                            <button
                              type="button"
                              className="btn btn-sm btn-outline-danger"
                              onClick={() => handleDelete(transaction.id)}
                              title="Excluir transação"
                              aria-label={`Excluir transação ${transaction.description || ''}`}
                            >
                              Excluir
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Assistente financeiro */}
        <div className="col-12 col-lg-4">
          <div className="card h-100">
            <div className="card-body">
              <h2 className="h5 mb-3">Assistente financeiro</h2>

              <p className="text-muted">
                Descubra oportunidades para organizar melhor seu dinheiro.
              </p>

              <button
                type="button"
                className="btn btn-outline-success w-100"
                disabled
              >
                Analisar minhas finanças
              </button>

              <small className="text-muted d-block mt-2">
                Disponível quando a integração com a IA estiver pronta.
              </small>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de descrição */}
      {selectedTransaction && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          role="dialog"
          aria-modal="true"
          aria-labelledby="descriptionModalTitle"
          onClick={() => setSelectedTransaction(null)}
        >
          <div
            className="modal-dialog modal-dialog-centered"
            role="document"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="descriptionModalTitle">
                  Descrição da transação
                </h5>

                <button
                  type="button"
                  className="btn-close"
                  aria-label="Fechar"
                  onClick={() => setSelectedTransaction(null)}
                />
              </div>

              <div className="modal-body">
                <p className="text-muted small mb-1">Categoria</p>
                <p className="fw-semibold mb-3">
                  {selectedTransaction.category || 'Sem categoria'}
                </p>

                <p className="text-muted small mb-1">
                  Descrição completa
                </p>
                <p className="mb-0 text-break">
                  {selectedTransaction.description || 'Sem descrição'}
                </p>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setSelectedTransaction(null)}
                >
                  Fechar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedTransaction && (
        <div
          className="modal-backdrop fade show"
          onClick={() => setSelectedTransaction(null)}
        />
      )}
    </div>
  );
}

export default Home;