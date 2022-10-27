import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/logo.svg';

export default function Header({ loggedIn, email, linkText, onSignOut }) {
    return (
        <header className="header">
            <div className="header__container">
                <Link to="/">
                    <img className="header__logo" src={logo} alt="Логотип" />
                </Link>
                {loggedIn ? (
                    <p className="header__email">
                        {email + ''}
                        <Link to="/sign-in" className="header__link opacity" onClick={onSignOut}>
                            Выход
                        </Link>
                    </p>
                ) : (
                    <Link
                        to={linkText === 'Вход' ? '/sign-in' : linkText === 'Регистрация' ? '/sign-up' : '/sign-in'}
                        className="header__link"
                    >
                        {linkText}
                    </Link>
                )}
            </div>
        </header>
    );
}
