import React, { useState } from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login({ handleLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate()

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setError('');

    Axios.post('http://localhost:3001/login', { email, password })
      .then((response) => {
        if (response.data.perfil && response.data.id && response.data.nome) {
          handleLogin(response.data.perfil, response.data.id, response.data.nome);
          localStorage.setItem('auth', 'true');
          localStorage.setItem('perfil', response.data.perfil);
          localStorage.setItem('userId', response.data.id);
          localStorage.setItem('userName', response.data.nome);
          navigate('/TelaInicial');
        } else {
          setError(response.data.msg);
        }
      })
      .catch((error) => {
        setError('Ocorreu um erro ao efetuar o login. Por favor, tente novamente.');
        console.log(error);
      });
  };

  return (
    <div className="app--container login-box">
      <div className="login--container">
        <h1 className="login--title">Login</h1>
        <p className="paragraph">Acesse seu perfil com as suas credênciais</p>
        {error && <p className="login--error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="login--input form-control"
            value={email}
            onChange={handleEmailChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Senha"
            className="login--input form-control"
            value={password}
            onChange={handlePasswordChange}
          />
          <div className='buttonEntrar'>
            <button type="submit" className="login--button btn btn-primary">Entrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
