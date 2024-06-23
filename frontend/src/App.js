import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import ApartmentsList from './ApartmentsList';
import ApartamentInner from './ApartamentInner';
import Header from './Header';
import { initializeScripts } from './js/main.js';
import Register from './Register';
import Login from './Login';
import PrivateRoute from './PrivateRoute';
import ProtectedComponent from './ProtectedComponent';
import authService from './authService';
import Home from './Home';

const API_URL = 'http://127.0.0.1:8000/api/apartments/';

function App() {
  const [apartments, setApartments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('newest');
  const [currentUser, setCurrentUser] = useState(null);

  const handleSearchChange = (event) => setSearchTerm(event.target.value);
  const handleSearchSubmit = () => {};
  const handleSortChange = (event) => setSortOption(event.target.value);

  const handleLogout = () => {
    authService.logout();
    setCurrentUser(null);
  };

  const filteredApartments = apartments.filter(apartment =>
    apartment.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
    apartment.country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedApartments = [...filteredApartments].sort((a, b) => {
    if (sortOption === 'cheapest') return a.price - b.price;
    if (sortOption === 'mostExpensive') return b.price - a.price;
    return new Date(b.date) - new Date(a.date);
  });

  useEffect(() => {
    axios.get(API_URL)
      .then(response => setApartments(response.data))
      .catch(error => console.error('Error fetching apartments:', error));
  }, []);

  useEffect(() => {
    initializeScripts();
  }, [apartments]);

  useEffect(() => {
    authService.getCurrentUser().then(user => {
      if (user) {
        console.log('Current User in App:', user); // Логирование текущего пользователя в App
        setCurrentUser(user);
      }
    });
  }, []);

  return (
    <Router>
      <Header
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        onSearchSubmit={handleSearchSubmit}
        sortOption={sortOption}
        onSortChange={handleSortChange}
        currentUser={currentUser}
        onLogout={handleLogout}
      />
      <Routes>
        <Route path="/" element={<ApartmentsList apartments={sortedApartments} />} />
        <Route path="/apartment/:id" element={<ApartamentInner apartments={apartments} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login setCurrentUser={setCurrentUser} />} />
        <Route path="/protected" element={<PrivateRoute component={ProtectedComponent} />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
