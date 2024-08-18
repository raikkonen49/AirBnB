// src/Logo.js
import React from 'react';
import logo from './img/air.png'; // Предполагая, что изображение находится в папке src/img

const Logo = () => {
  return (
    <a href="#">
      <img src={logo} alt="Logo" />
    </a>
  );
};

export default Logo;
