import React from "react";

const Apartment = (props) => {
  return (
    <>
      <div>
        <strong>{props.apartment.id}. Name: {props.apartment.apartment_name}</strong>
      </div>
      <div>
        {props.apartment.id}. Вescription: {props.apartment.description}
      </div>
      <div>
        {props.apartment.id}. Price: {props.apartment.price}
      </div>
      <div>
        {props.apartment.id}. Date: {props.apartment.date}
      </div>
      <div>
        {props.apartment.id}. Image: {props.apartment.image}
      </div>
      <div>
        {props.apartment.id}. Country: {props.apartment.country}
      </div>
      <div>
        {props.apartment.id}. City: {props.apartment.city}
      </div>
    </>
  )
}

export default Apartment;
