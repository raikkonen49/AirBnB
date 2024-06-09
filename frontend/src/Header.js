import React from 'react';
import Logo from './Logo';

const Header = () => {
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
                    <input placeholder="Поиск направлений" type="text" name="" value=""/>
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
                <button type="button" name="button">отправить</button>
            </div>
        </div>
    </div>
    </header>
  );
}

export default Header;
