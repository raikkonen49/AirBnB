import React from 'react';
import Logo from './Logo';

const Header = ({ searchTerm, onSearchChange, onSearchSubmit, sortOption, onSortChange }) => {
  return (
    <header>
    <div class="container">
        <div class="row">
            <div class="col col-lg-4 logo check">
                <Logo />
            </div>
            <div class="col col-lg-4 header-selector check">
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
            <div class="col col-lg-4 check">

            </div>
        </div>
        <div class="row row-header search-block">
            <div class="col col-lg-4 search-block-item">
                <div class="col col-sm-12">
                    <strong>Где</strong>
                </div>
                <div class="col col-sm-12">
                <input
                    placeholder="Поиск направлений"
                    type="text"
                    value={searchTerm}
                    onChange={onSearchChange}
                />
                </div>
            </div>
            <div class="col col-lg-2 search-block-item">
                <div class="col col-sm-12">
                    <strong>Прибытие</strong>
                </div>
                <div class="col col-sm-12">
                    Когда?
                </div>
            </div>
            <div class="col col-lg-2 search-block-item">
                <div class="col col-sm-12">
                    <strong>Выезд</strong>
                </div>
                <div class="col col-sm-12">
                    Когда?
                </div>
            </div>
            <div class="col col-lg-4 search-block-item">
                <div class="col col-sm-12">
                    <strong>Выезд</strong>
                </div>
                <div class="col col-sm-12">
                    Кто едет?
                </div>
                 <button type="button" name="button" onClick={onSearchSubmit}>Отправить</button>
            </div>
        </div>
        <div className="row sort-block">
          <div className="col col-lg-12">
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
}

export default Header;
