import React, { useEffect, useMemo } from 'react';
import Logo from './Logo';
import { Link } from 'react-router-dom';
import $ from 'jquery';
import 'select2/dist/css/select2.min.css';
import 'select2';

const Header = ({ searchTerm, onSearchChange, onSearchSubmit, sortOption, onSortChange, currentUser, onLogout, setCurrency, currency, exchangeRate }) => {

  useEffect(() => {
    // Инициализация Select2 на элементе select с id 'currency'
    $('#currency').select2();

    // Инициализация Select2 на элементе select в блоке sort-block
    $('.sort-block select').select2();

    // Обработчик изменения валюты через Select2
    $('#currency').on('change', function() {
      const newCurrency = $(this).val();
      if (newCurrency) {
        setCurrency(newCurrency);
      }
    });

    // Обработчик изменения сортировки через Select2
    $('.sort-block select').on('change', function() {
      const newSortOption = $(this).val();
      if (newSortOption) {
        onSortChange(newSortOption);
      }
    });

    // Очистка Select2 при размонтировании компонента
    return () => {
      $('#currency').select2('destroy');
      $('.sort-block select').select2('destroy');
    };
  }, [onSortChange, setCurrency]);

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
              Когда?
            </div>
          </div>
          <div className="col col-lg-2 search-block-item">
            <div className="col col-sm-12">
              <strong>Выезд</strong>
            </div>
            <div className="col col-sm-12">
              Когда?
            </div>
          </div>
          <div className="col col-lg-4 search-block-item">
            <div className="col col-sm-12">
              <strong>Выезд</strong>
            </div>
            <div className="col col-sm-12">
              Кто едет?
            </div>
            <button type="button" onClick={onSearchSubmit}>Отправить</button>
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
