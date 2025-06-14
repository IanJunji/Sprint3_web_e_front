import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isLoggedIn, logout } from '../utils/auth';
import '../styles/Dashboard.css';

function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    // Verifica se o usuário está logado
    if (!isLoggedIn()) {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="dashboard">
      <nav className="dashboard-nav">
        <h1>STOCAM</h1>
        <button onClick={handleLogout} className="logout-button">Sair</button>
      </nav>
      
      <div className="dashboard-content">
        <h2>Bem-vindo ao Dashboard</h2>
        <div className="dashboard-grid">
          <div className="dashboard-card">
            <h3>Produtos</h3>
            <p>Total: 0</p>
          </div>
          <div className="dashboard-card">
            <h3>Vendas</h3>
            <p>Total: 0</p>
          </div>
          <div className="dashboard-card">
            <h3>Estoque</h3>
            <p>Total: 0</p>
          </div>
          <div className="dashboard-card">
            <h3>Usuários</h3>
            <p>Total: 0</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;