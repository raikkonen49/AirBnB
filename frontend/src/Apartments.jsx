import React from 'react';

const Apartment = ({ apartment }) => {
  return (
    <div className="col col-lg-4">
      <a href={`/apartment/${apartment.id}`}>
        <div className="equalize-me">
          <img src={apartment.image} alt="Apartment" style={{ maxWidth: '100%', height: 'auto' }} />
        </div>
        <div>
          <strong>{apartment.city} ({apartment.country})</strong>
        </div>
        <div>
          {apartment.date}
        </div>
        <div>
          <strong>€ {apartment.price} за ночь</strong>
        </div>
      </a>
    </div>
  );
};

export default Apartment;
