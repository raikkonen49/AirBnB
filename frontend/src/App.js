/* global $ */

import React, { useEffect, useState } from "react";
import ApartmentsList from './ApartmentsList';
import axios from 'axios';
import { initializeScripts } from './js/main.js';
import Header from './Header';

const API_URL = 'http://127.0.0.1:8000/api/apartments/';

function App() {
  const [Apartments, setApartments] = useState([]);

  async function getApartments() {
    const response = await axios.get(API_URL);
    setApartments(response.data);
  }

  useEffect(() => {
    getApartments();
  }, []);

  useEffect(() => {
    initializeScripts(); // Вызываем initializeScripts после отрисовки ApartmentsList
  }, [Apartments]);

  return (
    <div>
        <Header />
        <ApartmentsList Apartments={Apartments} />
    </div>
  );
}

export default App;
