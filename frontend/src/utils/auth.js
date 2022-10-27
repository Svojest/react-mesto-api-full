class Auth {
    constructor(options) {
        this._authUrl = options.authUrl;
        this._headers = options.headers;
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка запроса: ${res.status}`);
    }
    register(email, password) {
        return fetch(`${this._authUrl}/signup`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        }).then(this._checkResponse);
    }
    autorization(email, password) {
        return fetch(`${this._authUrl}/signin`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        }).then(this._checkResponse);
    }

    checkToken = (token) => {
        return fetch(`${this._authUrl}/users/me`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        }).then(this._checkResponse);
    };
}

export const auth = new Auth({
    authUrl: 'https://auth.nomoreparties.co',
    headers: {
        'Content-Type': 'application/json',
    },
});
