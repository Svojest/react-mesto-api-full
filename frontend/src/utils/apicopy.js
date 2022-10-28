class Api {
    constructor(options) {
        this._options = options
        this._baseUrl = this._options.baseUrl;
        this._headers = this._options.headers;
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка запроса: ${res.status}`);
    }

    getUserInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'GET',
            credentials: 'include',
            headers: this._headers,
        }).then(this._checkResponse);
    }

    setUserInfo(userData) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            credentials: 'include',
            headers: this._headers,
            body: JSON.stringify({
                name: userData.name,
                about: userData.about,
            }),
        }).then(this._checkResponse);
    }

    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'GET',
            credentials: 'include',
            headers: this._headers,
        }).then(this._checkResponse);
    }

    addCard(data) {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            credentials: 'include',
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                link: data.link,
            }),
        }).then(this._checkResponse);
    }
    deleteCard(id) {
        return fetch(`${this._baseUrl}/cards/${id}`, {
            method: 'DELETE',
            credentials: 'include',
            headers: this._headers,
        }).then(this._checkResponse);
    }
    setLike(id) {
        return fetch(`${this._baseUrl}/cards/likes/${id}`, {
            method: 'PUT',
            credentials: 'include',
            headers: this._headers,
        }).then(this._checkResponse);
    }
    unsetLike(id) {
        return fetch(`${this._baseUrl}/cards/likes/${id}`, {
            method: 'DELETE',
            credentials: 'include',
            headers: this._headers,
        }).then(this._checkResponse);
    }
    setAvatar(data) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            credentials: 'include',
            headers: this._headers,
            body: JSON.stringify({
                avatar: data.avatar,
            }),
        }).then(this._checkResponse);
    }
    changeLikeCardStatus(id, isLiked) {
        return isLiked ? this.setLike(id) : this.unsetLike(id);
    }
}

export const api = new Api({
    baseUrl: 'http://localhost:3000',
    headers: {
        'Content-Type': 'application/json',
    },
});
