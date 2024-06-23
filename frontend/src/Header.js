import React, { useEffect, useMemo } from 'react';
import Logo from './Logo';
import { Link } from 'react-router-dom';
import authService from './authService'; // Импортируем authService

const Header = ({ searchTerm, onSearchChange, onSearchSubmit, sortOption, onSortChange, currentUser, onLogout }) => {
  const currentUsername = useMemo(() => {
    if (currentUser && currentUser.username) {
      console.log('Current User Name:', currentUser.username); // Логирование текущего пользователя
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
                <button type="button" name="button">Жилье</button>
              </li>
              <li>
                <button type="button" name="button">Впечатления</button>
              </li>
              <li>
                <button type="button" name="button">Онлайн-Впечатления</button>
              </li>
            </ul>
          </div>
          <div className="col col-lg-4 check">
            <ul className="auth-links">
              {!currentUsername && (
                <>
                  <li>
                    <Link to="/register">Register</Link>
                  </li>
                  <li>
                    <Link to="/login">Login</Link>
                  </li>
                </>
              )}
              {currentUsername && (
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
        <div className="row row-header search-block">
          <div className="col col-lg-4 search-block-item">
            <div className="col col-sm-12">
              <strong>Где</strong>
            </div>
            <div className="col col-sm-12">
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
            <button type="button" name="button" onClick={onSearchSubmit}>Отправить</button>
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
