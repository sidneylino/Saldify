import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as transactionService from '../../services/transactionService';

function TransactionForm() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    description: '',
    amount: '',
    type: 'income',
    category: '',
    transaction_date: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previousForm) => ({
      ...previousForm,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    if (
      !form.description.trim() ||
      !form.amount ||
      Number(form.amount) <= 0 ||
      !form.category.trim() ||
      !form.transaction_date
    ) {
      setError('Preencha todos os campos e informe um valor maior que zero.');
      return;
    }

    try {
      setLoading(true);

      await transactionService.create({
        description: form.description.trim(),
        amount: Number(form.amount),
        type: form.type,
        category: form.category.trim(),
        transaction_date: form.transaction_date,
      });

      navigate('/home');
    } catch (err) {
      console.error('Erro ao criar transação:', err);
      setError(
        err.response?.data?.message ||
        'Não foi possível salvar a transação.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-4">
      <header className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="h3 mb-1">Nova transação</h1>
          <p className="text-muted mb-0">
            Registre uma receita ou despesa.
          </p>
        </div>

        <Link to="/home" className="btn btn-outline-secondary">
          Voltar
        </Link>
      </header>

      <div className="row">
        <div className="col-12 col-lg-7">
          <div className="card dashboard-card">
            <div className="card-body p-4">
              {error && (
                <div className="alert alert-danger">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Descrição
                  </label>

                  <input
                    id="description"
                    name="description"
                    type="text"
                    className="form-control"
                    placeholder="Ex.: Salário, aluguel, mercado"
                    value={form.description}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="amount" className="form-label">
                    Valor (R$)
                  </label>

                  <input
                    id="amount"
                    name="amount"
                    type="number"
                    className="form-control"
                    placeholder="0.00"
                    min="0.01"
                    step="0.01"
                    value={form.amount}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="type" className="form-label">
                    Tipo de transação
                  </label>

                  <select
                    id="type"
                    name="type"
                    className="form-select"
                    value={form.type}
                    onChange={handleChange}
                    required
                  >
                    <option value="income">Receita</option>
                    <option value="expense">Despesa</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label htmlFor="category" className="form-label">
                    Categoria
                  </label>

                  <input
                    id="category"
                    name="category"
                    type="text"
                    className="form-control"
                    placeholder="Ex.: Alimentação, transporte, salário"
                    value={form.category}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="transaction_date" className="form-label">
                    Data da transação
                  </label>

                  <input
                    id="transaction_date"
                    name="transaction_date"
                    type="date"
                    className="form-control"
                    value={form.transaction_date}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="d-flex gap-2">
                  <button
                    type="submit"
                    className="btn btn-success"
                    disabled={loading}
                  >
                    {loading ? 'Salvando...' : 'Salvar transação'}
                  </button>

                  <Link to="/home" className="btn btn-outline-secondary">
                    Cancelar
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TransactionForm;