import React from 'react';
import logo from './img/air.png'; // Предполагая, что изображение находится в папке src/img

const Logo = ({ url = "http://localhost:3000" }) => {
  return (
    <a href={url}>
      <img src={logo} alt="Logo" />
    </a>
  );
};

export default Logo;
