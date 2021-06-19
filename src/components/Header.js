import React from 'react';
import logo from '../images/logo.svg';
import { Route, Link, Switch } from 'react-router-dom';

function Header(props) {
    return (
        <header className="header">
            <a className="link" href="/#" target="_self">
            <img className="header__logo" src={logo} alt="Логотип"/>
            </a>
            <div className="header__login">
                <Switch>
                    <Route path="/sign-up">
                        <Link to="/sign-in" className="header__email">Войти</Link>
                    </Route>
                    <Route path="/sign-in">
                        <Link to="/sign-up" className="header__email">Регистрация</Link>
                    </Route>
                    <Route path="/">
                        <p className="header__email">{props.email}</p>
                        <p className="header__email" onClick={props.onSignOut}>Выйти</p>
                    </Route>
                </Switch>
            </div>
        </header>
    );
}

export default Header;