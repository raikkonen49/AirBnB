import React from "react";
import Apartment from './Apartments';

const ApartmentsList = ({Apartments}) => {
  if (!Apartments.length) {
    return <p>No found</p>
  }

  return (
    <div className="container">
        <div className="row">
          {Apartments.map(apartment =><Apartment apartment={apartment} key={apartment.id}/>)}
        </div>
    </div>
  );
};

export default ApartmentsList;
