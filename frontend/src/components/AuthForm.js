import React from 'react';

export default function AuthForm({ onSubmit, children, signIn, email, password, onChangeEmail, onChangePassword }) {
    return (
        <div className="form">
            <div className="form__container">
                <h1 className="form__title">{signIn ? 'Вход' : 'Регистрация'}</h1>
                <form className="form__inputs" onSubmit={onSubmit}>
                    <input
                        className="form__input"
                        type="email"
                        placeholder="Email"
                        name="form-email"
                        value={email}
                        onChange={onChangeEmail}
                    ></input>
                    <input
                        className="form__input"
                        type="password"
                        placeholder="Пароль"
                        name="form-password"
                        value={password || ''}
                        onChange={onChangePassword}
                    ></input>
                    <button type="submit" className="form__button">
                        {signIn ? 'Войти' : 'Зарегистрироваться'}
                    </button>
                    {children}
                </form>
            </div>
        </div>
    );
}
