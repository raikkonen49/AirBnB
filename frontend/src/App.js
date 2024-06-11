import React, { useEffect, useState } from "react";
import ApartmentsList from './ApartmentsList'; // Импорт компонента для отображения списка квартир
import axios from 'axios'; // Импорт библиотеки для HTTP-запросов
import { initializeScripts } from './js/main.js'; // Импорт функции инициализации скриптов
import Header from './Header'; // Импорт компонента Header

// URL API для получения данных о квартирах
const API_URL = 'http://127.0.0.1:8000/api/apartments/';

function App() {
  // Состояние для хранения списка квартир
  const [Apartments, setApartments] = useState([]);
  // Состояние для хранения поискового запроса
  const [searchTerm, setSearchTerm] = useState('');
  // Состояние для хранения опции сортировки
  const [sortOption, setSortOption] = useState('newest');

  // Обработчик изменения поискового запроса
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Обработчик отправки поискового запроса
  const handleSearchSubmit = () => {
    // Обработка нажатия кнопки "Отправить"
    // Здесь можно добавить дополнительную логику для поиска
  };

  // Обработчик изменения опции сортировки
  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  // Фильтрация списка квартир по поисковому запросу
  const filteredApartments = Apartments.filter(apartment =>
    apartment.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
    apartment.country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Сортировка отфильтрованных квартир по выбранной опции сортировки
  const sortedApartments = [...filteredApartments].sort((a, b) => {
    if (sortOption === 'cheapest') {
      return a.price - b.price; // Сортировка по возрастанию цены
    } else if (sortOption === 'mostExpensive') {
      return b.price - a.price; // Сортировка по убыванию цены
    } else {
      return new Date(b.date) - new Date(a.date); // Сортировка по дате (новые сначала)
    }
  });

  // Асинхронная функция для получения списка квартир с сервера
  async function getApartments() {
    const response = await axios.get(API_URL);
    setApartments(response.data); // Обновление состояния списка квартир
  }

  // Хук useEffect для получения списка квартир при загрузке компонента
  useEffect(() => {
    getApartments();
  }, []);

  // Хук useEffect для инициализации скриптов после отрисовки списка квартир
  useEffect(() => {
    initializeScripts();
  }, [Apartments]);

  // Отрисовка компонентов Header и ApartmentsList с передачей необходимых пропсов
  return (
    <div>
      <Header
        searchTerm={searchTerm} // Передача поискового запроса в Header
        onSearchChange={handleSearchChange} // Передача обработчика изменения поискового запроса в Header
        onSearchSubmit={handleSearchSubmit} // Передача обработчика отправки поискового запроса в Header
        sortOption={sortOption} // Передача опции сортировки в Header
        onSortChange={handleSortChange} // Передача обработчика изменения опции сортировки в Header
      />
      <ApartmentsList Apartments={sortedApartments} /> {/* Отображение отсортированного списка квартир */}
    </div>
  );
}

export default App;
