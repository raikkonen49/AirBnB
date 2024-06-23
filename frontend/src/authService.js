import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const API_URL = 'http://127.0.0.1:8000/api';

const login = (username, password) => {
  return axios
    .post(API_URL + '/login/', {
      username,
      password,
    })
    .then((response) => {
      if (response.data.access) {
        const decodedToken = jwtDecode(response.data.access);
        console.log('Decoded Token:', decodedToken); // Логирование декодированного токена
        const user = {
          accessToken: response.data.access,
          decodedToken: decodedToken,
          username: response.data.username,  // Сохраняем username
        };
        localStorage.setItem('user', JSON.stringify(user));
      }
      return response.data;
    }).catch(error => {
      console.error('Login failed', error);
      throw error;
    });
};

const getCurrentUser = async () => {
  const user = localStorage.getItem('user');
  if (user && user !== 'undefined') {
    try {
      const parsedUser = JSON.parse(user);
      console.log('Current User:', parsedUser); // Логирование текущего пользователя
      return parsedUser;
    } catch (error) {
      console.error('Failed to parse user data', error);
      localStorage.removeItem('user'); // Очистка неверного значения
      return null;
    }
  }
  return null;
};

const logout = () => {
  localStorage.removeItem('user');
};

const authService = {
  login,
  getCurrentUser,
  logout, // Добавляем logout в объект authService
};

export default authService;
