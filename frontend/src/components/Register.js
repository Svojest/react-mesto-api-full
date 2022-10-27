import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import AuthForm from './AuthForm.js';

function Register({ onRegister }) {
    // Здесь по чек листу не могу сделать универсальный onChange из 'useFormAndValidation'
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        setEmail('');
        setPassword('');
    }, []);

    function handleSubmit(e) {
        e.preventDefault();

        onRegister(email, password);
    }
    return (
        <AuthForm
            onSubmit={handleSubmit}
            signIn={false}
            email={email}
            password={password}
            onChangeEmail={(e) => setEmail(e.target.value)}
            onChangePassword={(e) => setPassword(e.target.value)}
        >
            <Link to="/sign-in" className="form__link">
                <p className="form__link-text">Уже зарегистрированы? Войти</p>
            </Link>
        </AuthForm>
    );
}

export default Register;
