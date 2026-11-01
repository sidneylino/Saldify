import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as transactionService from '../../services/transactionService';
import './Home.css';

function Home() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedTransaction, setSelectedTransaction] = useState(null);
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

  const formatCurrency = (value) => {
    return Number(value || 0).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  };

  const isIncome = (transaction) => transaction.type === 'income';

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
    } catch (err) {
      console.error('Erro ao excluir transação:', err);
      setError('Não foi possível excluir a transação.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');

    navigate('/');
  };

  return (
    <div className="container py-4">
    <header className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="h3 mb-1">Painel financeiro</h1>
          <p className="text-muted mb-0">
            Acompanhe suas finanças em um só lugar.
          </p>
        </div>

        <div className="d-flex align-items-center gap-2">
          <Link to="/transactions/new" className="btn btn-success">
            + Nova transação
          </Link>

          <button
            type="button"
            className="btn btn-outline-danger"
            onClick={handleLogout}
          >
            Sair
          </button>
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
        {/* Transações recentes */}
        <div className="col-12 col-lg-8">
          <div className="card h-100">
            <div className="card-body">
              <h2 className="h5 mb-3">Transações recentes</h2>

              {loading && (
                <p className="text-muted">Carregando transações...</p>
              )}

              {!loading && error && (
                <p className="text-danger">{error}</p>
              )}

              {!loading && !error && transactions.length === 0 && (
                <p className="text-muted mb-0">
                  Nenhuma transação encontrada.
                </p>
              )}

              {!loading && !error && transactions.length > 0 && (
                <div className="table-responsive">
                  <table className="table align-middle mb-0">
                    <thead>
                      <tr>
                        <th>Categoria</th>
                        <th>Tipo</th>
                        <th className="text-end">Valor</th>
                        <th className="text-end">Ações</th>
                      </tr>
                    </thead>

                    <tbody>
                      {[...transactions]
                        .slice(0, 5)
                        .map((transaction) => (
                          <tr key={transaction.id}>
                            <td>
                              {transaction.category || 'Sem categoria'}
                            </td>

                            <td>
                              <span
                                className={
                                  isIncome(transaction)
                                    ? 'text-success'
                                    : 'text-danger'
                                }
                              >
                                {isIncome(transaction) ? 'Receita' : 'Despesa'}
                              </span>
                            </td>

                            <td
                              className={`text-end ${
                                isIncome(transaction)
                                  ? 'text-success'
                                  : 'text-danger'
                              }`}
                            >
                              {formatCurrency(transaction.amount)}
                            </td>

                            <td className="text-end text-nowrap">
                              <button
                                type="button"
                                className="btn btn-sm btn-outline-secondary me-2"
                                onClick={() => setSelectedTransaction(transaction)}
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
                <h5
                  className="modal-title"
                  id="descriptionModalTitle"
                >
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
                <p className="text-muted small mb-1">
                  Categoria
                </p>
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