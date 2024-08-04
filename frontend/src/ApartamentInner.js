import React from 'react';
import { useParams } from 'react-router-dom';
import MapComponent from './MapComponent';
import DOMPurify from 'dompurify';

const ApartamentInner = ({ apartments, currency, exchangeRate }) => {
  const { id } = useParams();
  const apartment = apartments.find(apartment => apartment.id === parseInt(id));

  if (!apartment) {
    return <div>Загрузка...</div>;
  }

  const cleanDescription = DOMPurify.sanitize(apartment.description);

  const convertCurrency = (price, rate) => {
    if (!exchangeRate) return price;
    return (price * exchangeRate[rate]).toFixed(2);
  };

  return (
    <div className="row apartment-inner-cont">
      <div className="col-xl-6">
        <div className="col col-lg-12 apartment-inner-name">
          <h1><strong>{apartment.apartment_name}</strong></h1>
        </div>
        <div className="col col-lg-12 apartment-inner-image">
          <img src={apartment.image} alt="Apartment" style={{ maxWidth: '100%', height: 'auto' }} />
        </div>
        <div className="col col-lg-12 apartment-inner-gallery">
          {/* Галерея */}
        </div>
        <div className="col col-lg-12 apartment-inner-place">
          {apartment.city}, {apartment.country}
        </div>
        <div className="col col-lg-12 apartment-inner-adress">
          {apartment.address}
        </div>
        <div className="col col-lg-12 apartment-inner-price">
          Цена: €{apartment.price} / {currency === 'EUR' ? '€' : currency} {convertCurrency(apartment.price, currency)} за ночь
        </div>
        <div className="col col-lg-12 apartment-inner-owner">
          <strong>Хозяин: Jubilee</strong>
        </div>
        <div className="col col-lg-12 apartment-inner-description" dangerouslySetInnerHTML={{ __html: cleanDescription }} />
      </div>
      <div className="col-xl-6">
        <div className="col col-lg-12 apartment-inner-name">
          <strong>Карта местности</strong>
        </div>
        <div className="col col-lg-12 map-block">
          <MapComponent address={apartment.address} />
        </div>
      </div>
    </div>
  );
};

export default ApartamentInner;
