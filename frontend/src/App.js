import React, { useEffect, useState } from 'react'; // Импорт необходимых хуков из React
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Импорт компонентов для маршрутизации
import axios from 'axios'; // Импорт библиотеки для HTTP-запросов
import ApartmentsList from './ApartmentsList'; // Импорт компонента для отображения списка квартир
import ApartamentInner from './ApartamentInner'; // Импорт компонента для отображения деталей квартиры
import Header from './Header'; // Импорт компонента Header
import { initializeScripts } from './js/main.js'; // Импорт функции инициализации скриптов

// URL API для получения данных о квартирах
const API_URL = 'http://127.0.0.1:8000/api/apartments/';

function App() {
  // Создаем состояние для хранения списка квартир
  const [apartments, setApartments] = useState([]);
  // Создаем состояние для хранения поискового запроса
  const [searchTerm, setSearchTerm] = useState('');
  // Создаем состояние для хранения опции сортировки
  const [sortOption, setSortOption] = useState('newest');

  // Обработчик изменения поискового запроса
  const handleSearchChange = (event) => setSearchTerm(event.target.value);

  // Обработчик отправки поискового запроса
  const handleSearchSubmit = () => {};

  // Обработчик изменения опции сортировки
  const handleSortChange = (event) => setSortOption(event.target.value);

  // Фильтрация списка квартир по поисковому запросу
  const filteredApartments = apartments.filter(apartment =>
    apartment.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
    apartment.country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Сортировка отфильтрованных квартир по выбранной опции сортировки
  const sortedApartments = [...filteredApartments].sort((a, b) => {
    if (sortOption === 'cheapest') return a.price - b.price; // Сортировка по возрастанию цены
    if (sortOption === 'mostExpensive') return b.price - a.price; // Сортировка по убыванию цены
    return new Date(b.date) - new Date(a.date); // Сортировка по дате (новые сначала)
  });

  // Хук useEffect для получения списка квартир при загрузке компонента
  useEffect(() => {
    axios.get(API_URL)
      .then(response => setApartments(response.data)) // Обновление состояния списка квартир данными с сервера
      .catch(error => console.error('Error fetching apartments:', error)); // Обработка ошибки при загрузке данных
  }, []);

  // Хук useEffect для инициализации скриптов после отрисовки списка квартир
  useEffect(() => {
    initializeScripts();
  }, [apartments]);

  return (
    <Router>
      {/* Компонент Header для отображения поисковой строки и опций сортировки */}
      <Header
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        onSearchSubmit={handleSearchSubmit}
        sortOption={sortOption}
        onSortChange={handleSortChange}
      />
      <Routes>
        {/* Маршрут для главной страницы, отображающей список квартир */}
        <Route path="/" element={<ApartmentsList apartments={sortedApartments} />} />
        {/* Маршрут для страницы с деталями квартиры */}
        <Route path="/apartment/:id" element={<ApartamentInner apartments={apartments} />} />
      </Routes>
    </Router>
  );
}

export default App;
