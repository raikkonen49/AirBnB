import React from "react";
import Apartment from './Apartments';

const ApartmentsList = ({Apartments}) => {

  return (
    <div>
      {Apartments.map(apartment =><Apartment apartment={apartment} key={apartment.id}/>)}
    </div>
  );
};

export default ApartmentsList;
