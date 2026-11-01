import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from '../pages/Login/Login';
import Signup from '../pages/Signup/Signup';
import Home from '../pages/Home/Home';
import ProtectedRoute from './protectedRoute';
import TransactionForm from '../pages/Transactions/TransactionsForm';

export default function AppRoutes() {
  return (
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route 
          path="/home" 
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } 
        />
        <Route path="/transactions/new" element={<TransactionForm />} />
      </Routes>
  );
}