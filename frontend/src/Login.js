import React, { useState } from 'react';
import authService from './authService'; // Используем authService вместо axios
import { useNavigate } from 'react-router-dom';

const Login = ({ setCurrentUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await authService.login(username, password); // Используем login функцию из authService
      if (user) {
        setCurrentUser(user);
        console.log('User logged in:', user); // Отладочный вывод
        navigate('/');
      }
    } catch (error) {
      console.error('Login failed', error);
      setErrorMessage(error.response?.data?.detail || 'Login failed');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {errorMessage && <p>{errorMessage}</p>}
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button> {/* Указываем тип submit для кнопки */}
      </form>
    </div>
  );
};

export default Login;
