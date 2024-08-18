import React, { useState, useEffect, useMemo } from 'react';
import Logo from './logo';
import { Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import $ from 'jquery';
import 'select2/dist/css/select2.min.css';
import 'select2';

const Header = ({ searchTerm, onSearchChange, onSearchSubmit, sortOption, onSortChange, currentUser, onLogout, setCurrency, currency, exchangeRate }) => {
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);

  useEffect(() => {
    $('#currency').select2();
    $('.sort-block select').select2();

    $('#currency').on('change', function() {
      const newCurrency = $(this).val();
      if (newCurrency) {
        setCurrency(newCurrency);
      }
    });

    $('.sort-block select').on('change', function() {
      const newSortOption = $(this).val();
      if (newSortOption) {
        onSortChange(newSortOption);
      }
    });

    return () => {
      $('#currency').select2('destroy');
      $('.sort-block select').select2('destroy');
    };
  }, [onSortChange, setCurrency]);

  const handleSearchSubmit = () => {
    console.log("checkInDate:", checkInDate);
    console.log("checkOutDate:", checkOutDate);

    const isValidDate = (date) => {
        return date instanceof Date && !isNaN(date);
    };

    const formatDate = (date) => {
        return isValidDate(date) ? date.toISOString().split('T')[0] : null;
    };

    const formattedCheckInDate = formatDate(checkInDate);
    const formattedCheckOutDate = formatDate(checkOutDate);

    console.log("Formatted checkInDate:", formattedCheckInDate);
    console.log("Formatted checkOutDate:", formattedCheckOutDate);

    onSearchSubmit({ checkInDate: formattedCheckInDate, checkOutDate: formattedCheckOutDate });
};


  const currentUsername = useMemo(() => {
    if (currentUser && currentUser.username) {
      return currentUser.username;
    }
    return null;
  }, [currentUser]);

  return (
    <header>
      <div className="container">
        <div className="row">
          <div className="col col-lg-4 logo check">
            <Logo />
          </div>
          <div className="col col-lg-4 header-selector check">
            <ul>
              <li>
                <button type="button">Жилье</button>
              </li>
              <li>
                <button type="button">Впечатления</button>
              </li>
              <li>
                <button type="button">Онлайн-Впечатления</button>
              </li>
            </ul>
          </div>
          <div className="col col-lg-4 check">
            <div className="row">
              <div className="col col-lg-6 converter">
                <select id="currency" value={currency}>
                  {exchangeRate && ['EUR', 'GBP', 'RUB', 'BYN', 'USD'].map((rate, index) => (
                    <option key={index} value={rate}>{rate}</option>
                  ))}
                </select>
              </div>
              <div className="col col-lg-6 authorization">
                <ul className="auth-links">
                  {!currentUsername ? (
                    <>
                      <li>
                        <Link to="/register">Register</Link>
                      </li>
                      <li>
                        <Link to="/login">Login</Link>
                      </li>
                    </>
                  ) : (
                    <>
                      <li>
                        <span>Welcome, {currentUsername}!</span>
                      </li>
                      <li>
                        <button onClick={onLogout}>Logout</button>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="row row-header search-block">
          <div className="col col-lg-4 search-block-item">
            <div className="col col-sm-12">
              <strong>Где</strong>
            </div>
            <div className="col col-sm-12 search-area">
              <input
                placeholder="Поиск направлений"
                type="text"
                value={searchTerm}
                onChange={onSearchChange}
              />
            </div>
          </div>
          <div className="col col-lg-2 search-block-item">
            <div className="col col-sm-12">
              <strong>Прибытие</strong>
            </div>
            <div className="col col-sm-12">
              <DatePicker
                selected={checkInDate}
                onChange={date => setCheckInDate(date)}
                placeholderText="Когда?"
                dateFormat="dd/MM/yyyy"
                className="form-control"
              />
            </div>
          </div>
          <div className="col col-lg-2 search-block-item">
            <div className="col col-sm-12">
              <strong>Выезд</strong>
            </div>
            <div className="col col-sm-12">
              <DatePicker
                selected={checkOutDate}
                onChange={date => setCheckOutDate(date)}
                placeholderText="Когда?"
                dateFormat="dd/MM/yyyy"
                className="form-control"
              />
            </div>
          </div>
          <div className="col col-lg-4 search-block-item">
            <div className="col col-sm-12">
              <strong>Кто едет?</strong>
            </div>
            <button type="button" onClick={handleSearchSubmit}>Отправить</button>
          </div>
        </div>
        <div className="row">
          <div className="col col-lg-12 sort-block">
            <label>
              Сортировать по:
              <select value={sortOption} onChange={onSortChange}>
                <option value="newest">Новые</option>
                <option value="cheapest">Самые дешевые</option>
                <option value="mostExpensive">Самые дорогие</option>
              </select>
            </label>
          </div>
        </div>
      </div>
    </header>
  );
};

export default React.memo(Header);
