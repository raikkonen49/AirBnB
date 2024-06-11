import React from 'react';
import { useParams } from 'react-router-dom';

const ApartamentInner = ({ apartments }) => {
  const { id } = useParams();
  const apartment = apartments.find(apartment => apartment.id === parseInt(id));

  if (!apartment) {
    return <div>Загрузка...</div>;
  }

  return (
    <div className="container mt-5">
      <h1>Детальная информация об апартаменте</h1>
      <img src={apartment.image} alt="Apartment" style={{ maxWidth: '100%', height: 'auto' }} />
      <p>Город: {apartment.city}</p>
      <p>Страна: {apartment.country}</p>
      <p>Цена: €{apartment.price} за ночь</p>
    </div>
  );
};

export default ApartamentInner;
