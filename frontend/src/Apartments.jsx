import React from "react";

const Apartment = (props) => {
  return (
    <div className="col col-lg-4">
      <div className="equalize-me">
        <img src={props.apartment.image} alt="Apartment" style={{ maxWidth: '100%', height: 'auto' }} />
      </div>
      <div>
        <strong>{props.apartment.city} ({props.apartment.country})</strong>
      </div>
      <div>
        {props.apartment.date}
      </div>
      <div>
        <strong>€ {props.apartment.price} ночь</strong>
      </div>
    </div>
  );
};

export default Apartment;
