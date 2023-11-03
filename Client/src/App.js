import React, { useState, useEffect } from 'react';
import './App.css';
import { Space } from 'antd';
import { useNavigate } from 'react-router-dom';
import Login from './TelaLogin';
import AppHeaderRecepcionista from './components/Recepcionista/AppHeader';
import AppHeaderAdvogado from './components/Advogado/AppHeader';
import SideMenuRecepcionista from './components/Recepcionista/SideMenu';
import SideMenuAdvogado from './components/Advogado/SideMenu';
import AppRoutes from './Rotas/routes';
import AppFooterRecepcionista from './components/Recepcionista/AppFooter';
import AppFooterAdvogado from './components/Advogado/AppFooter';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [perfil, setPerfil] = useState('');

  useEffect(() => {
    const storedAuth = localStorage.getItem('auth');
    const storedPerfil = localStorage.getItem('perfil');
    if (storedAuth && storedPerfil) {
      setIsAuthenticated(storedAuth === 'true');
      setPerfil(storedPerfil);
    }
  }, []);

  const handleLogin = (perfil) => {
    setIsAuthenticated(true);
    setPerfil(perfil);
    localStorage.setItem('auth', 'true');
    localStorage.setItem('perfil', perfil);
  };
  
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPerfil('');
    localStorage.removeItem('auth');
    localStorage.removeItem('perfil');
    navigate('/');
  };

  return (
    <div className="App">
      {isAuthenticated ? (
        perfil === 'advogado' ? (
          <AppHeaderAdvogado isAuthenticated={isAuthenticated} handleLogout={handleLogout} />
        ) : (
          <AppHeaderRecepcionista isAuthenticated={isAuthenticated} handleLogout={handleLogout} />
        )
      ) : null}

      <Space className="SideMenuAndPageContent">
        {isAuthenticated ? (
          perfil === 'advogado' ? (
            <SideMenuAdvogado isAuthenticated={isAuthenticated} />
          ) : (
            <SideMenuRecepcionista isAuthenticated={isAuthenticated} />
          )
        ) : null}
        {isAuthenticated ? (
          <AppRoutes perfil={perfil} handleLogout={handleLogout} />
        ) : (
          <Login handleLogin={handleLogin} />
        )}
      </Space>

      {isAuthenticated ? (
        perfil === 'advogado' ? (
          <AppFooterAdvogado />
        ) : (
          <AppFooterRecepcionista />
        )
      ) : null}
    </div>
  );
}

export default App;
