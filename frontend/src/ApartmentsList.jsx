import React from "react";
import Apartment from './Apartments';

const ApartmentsList = ({ apartments }) => {
  if (!apartments || apartments.length === 0) {
    return <p>No apartments found</p>;
  }

  return (
    <div className="container">
      <div className="row">
        {apartments.map(apartment => (
          <Apartment key={apartment.id} apartment={apartment} />
        ))}
      </div>
    </div>
  );
};

export default ApartmentsList;
