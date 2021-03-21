import React from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import logo from '../images/logo-image.svg';

function Header ({email, handleLogout}) {
    return (
        <header className="header">
            <img src={logo} alt="логотип-место" className="header__logo" />
            <Switch>
                <Route exact path='/'>
                    <div className="header__container">
                        <p className="header__profile">{email}</p>
                        <Link to="/signup" className="header__log-btn" onClick={ handleLogout }>Выйти</Link>
                    </div>
                </Route>
                <Route exact path='/signup'>
                    <Link className="header__log-btn"  to="/signin">Войти</Link>
                </Route>
                <Route exact path='/signin'>
                    <Link className="header__log-btn" to="/signup">Регистрация</Link>
                </Route>
            </Switch>
        </header>
    )
}

export default Header;