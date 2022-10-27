import React, { useEffect, useState } from 'react';

import AuthForm from './AuthForm.js';

function Login({ onLogin }) {
    // Здесь по чек листу не выйдет сделать универсальный onChange из 'useFormAndValidation'
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        setEmail('');
        setPassword('');
    }, []);

    function handleSubmit(e) {
        e.preventDefault();
        onLogin(email, password);
    }
    return (
        <AuthForm
            signIn={true}
            onSubmit={handleSubmit}
            email={email}
            password={password}
            onChangeEmail={(e) => setEmail(e.target.value)}
            onChangePassword={(e) => setPassword(e.target.value)}
        ></AuthForm>
    );
}

export default Login;
