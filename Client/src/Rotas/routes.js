import React, { useState, useEffect } from 'react';
import { Route, Navigate, Routes, useLocation, Outlet } from 'react-router-dom';
import TelaInicialAdvogado from '../pagesAdvogado/TelaInicial/index';
import CadClientesAdvogado from '../pagesAdvogado/CadClientes/index';
import CadFuncionariosAdvogado from '../pagesAdvogado/CadFuncionarios/index';
import CadProcessosAdvogado from '../pagesAdvogado/CadProcessos/index';
import TelaInicialRecepcionista from '../pagesRecepcionista/TelaInicial/index';
import CadClientesRecepcionista from '../pagesRecepcionista/CadClientes/index';
import CadFuncionariosRecepcionista from '../pagesRecepcionista/CadFuncionarios/index';
import CadProcessosRecepcionista from '../pagesRecepcionista/CadProcessos/index';
import Login from '../TelaLogin/index';

export default function AppRoutes() {
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [perfil, setPerfil] = useState('');
  const [userId, setUserId] = useState('');
  const [userName, setUserName] = useState('');
  const location = useLocation();

  useEffect(() => {
    const storedAuth = localStorage.getItem('auth');
    const storedPerfil = localStorage.getItem('perfil');
    const storedUserId = localStorage.getItem('userId');
    const storedUserName = localStorage.getItem('userName');
    if (storedAuth === 'true' && storedPerfil && storedUserId && storedUserName) {
      setAuthenticated(true);
      setPerfil(storedPerfil);
      setUserId(storedUserId);
      setUserName(storedUserName);
    }
  }, []);

  const handleLogin = (perfil, id, nome) => {
    setAuthenticated(true);
    setPerfil(perfil);
    setUserId(id);
    setUserName(nome);
    localStorage.setItem('auth', 'true');
    localStorage.setItem('perfil', perfil);
    localStorage.setItem('userId', id);
    localStorage.setItem('userName', nome);
  };

  if (location.pathname === '/login') {
    // Se já estiver autenticado, redirecionar para a página inicial adequada
    if (isAuthenticated) {
      if (perfil === 'advogado') {
        return <Navigate to="/TelaInicialAdvogado" />;
      } else if (perfil === 'recepcionista') {
        return <Navigate to="/TelaInicialRecepcionista" />;
      }
    }
  } else {
    // Se não estiver autenticado, redirecionar para a tela de login
    if (!isAuthenticated) {
      return <Navigate to="/login" />;
    }
  }

  return (
    <div>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login handleLogin={handleLogin} />} />
        <Route
          path="/TelaInicialAdvogado"
          element={<TelaInicialAdvogado userId={userId} userName={userName} perfil={perfil} />}
        />
        <Route
          path="/TelaInicialRecepcionista"
          element={<TelaInicialRecepcionista userId={userId} userName={userName} perfil={perfil} />}
        />
        <Route
          path="/CadClientes"
          element={
            perfil === 'advogado' ? (
              <CadClientesAdvogado userId={userId} userName={userName} perfil={perfil} />
            ) : (
              <CadClientesRecepcionista userId={userId} userName={userName} perfil={perfil} />
            )
          }
        />
        <Route
          path="/CadFuncionarios"
          element={
            perfil === 'advogado' ? (
              <CadFuncionariosAdvogado userId={userId} userName={userName} perfil={perfil} />
            ) : (
              <CadFuncionariosRecepcionista userId={userId} userName={userName} perfil={perfil} />
            )
          }
        />
        <Route
          path="/CadProcessos"
          element={
            perfil === 'advogado' ? (
              <CadProcessosAdvogado userId={userId} userName={userName} perfil={perfil} />
            ) : (
              <CadProcessosRecepcionista userId={userId} userName={userName} perfil={perfil} />
            )
          }
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
      <Outlet />
    </div>
  );
}

export function logout() {
  localStorage.removeItem('auth');
  localStorage.removeItem('perfil');
  localStorage.removeItem('userId');
  localStorage.removeItem('userName');
  Navigate('/login');
}
