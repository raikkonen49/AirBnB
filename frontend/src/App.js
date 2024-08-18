import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import ApartmentsList from './ApartmentsList';
import ApartamentInner from './ApartamentInner';
import Header from './Header';
import Register from './Register';
import Login from './Login';
import PrivateRoute from './PrivateRoute';
import ProtectedComponent from './ProtectedComponent';
import authService from './authService';
import Home from './Home';

const API_URL = 'http://127.0.0.1:8000/api/apartments/';
const EXCHANGE_RATE_API_URL = 'https://api.exchangerate-api.com/v4/latest/EUR';

function App() {
  const [apartments, setApartments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('newest');
  const [currentUser, setCurrentUser] = useState(null);
  const [currency, setCurrency] = useState('EUR');
  const [exchangeRate, setExchangeRate] = useState(null);

  const handleSearchChange = (event) => setSearchTerm(event.target.value);

  const handleSearchSubmit = async ({ checkInDate, checkOutDate }) => {
    console.log("Received checkInDate:", checkInDate);
    console.log("Received checkOutDate:", checkOutDate);

    try {
        const response = await axios.get(API_URL, {
            params: {
                check_in_date: checkInDate,  // Даты уже должны быть в нужном формате
                check_out_date: checkOutDate,
            },
        });
        setApartments(response.data);
    } catch (error) {
        console.error('Ошибка при получении данных:', error);
    }
};

  const handleSortChange = (newSortOption) => setSortOption(newSortOption);

  const handleLogout = () => {
    authService.logout();
    setCurrentUser(null);
  };

  useEffect(() => {
    axios.get(API_URL)
      .then(response => setApartments(response.data))
      .catch(error => console.error('Error fetching apartments:', error));
  }, []);

  useEffect(() => {
    authService.getCurrentUser().then(user => {
      if (user) {
        setCurrentUser(user);
      }
    });
  }, []);

  useEffect(() => {
    const fetchExchangeRate = async () => {
      try {
        const response = await axios.get(EXCHANGE_RATE_API_URL);
        setExchangeRate(response.data.rates);
      } catch (error) {
        console.error('Ошибка при получении курса валют', error);
      }
    };

    fetchExchangeRate();
    const intervalId = setInterval(fetchExchangeRate, 60000);

    return () => clearInterval(intervalId);
  }, []);

  const filteredApartments = apartments.filter(apartment =>
    apartment.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
    apartment.country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedApartments = [...filteredApartments].sort((a, b) => {
    if (sortOption === 'cheapest') return a.price - b.price;
    if (sortOption === 'mostExpensive') return b.price - a.price;
    return new Date(b.date) - new Date(a.date);
  });

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
        currency={currency}
        setCurrency={setCurrency}
        exchangeRate={exchangeRate}
      />
      <Routes>
        <Route path="/" element={<ApartmentsList apartments={sortedApartments} />} />
        <Route path="/apartment/:id" element={
          <ApartamentInner
            apartments={apartments}
            currency={currency}
            exchangeRate={exchangeRate}
          />
        } />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login setCurrentUser={setCurrentUser} />} />
        <Route path="/protected" element={<PrivateRoute component={ProtectedComponent} />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
