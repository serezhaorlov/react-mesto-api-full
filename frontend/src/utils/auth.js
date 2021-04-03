class Auth {
    constructor (options) {
        this._url = options.baseUrl;
        this._headers = options.headers;
    }

    register(email, password) {
        return fetch(`${this._url}/signup`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                email: email,
                password: password,
            })
        }
        )
        .then((res) => res.ok ? res.json() : Promise.reject(`${res.status} ${res.statusText}`));
    }

    login(email, password) {
        return fetch(`${this._url}/signin`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                email: email,
                password: password,
            })
        })
        .then((res) => res.ok ? res.json() : Promise.reject(`${res.status} ${res.statusText}`));
    }

    checkToken(token) {
        return fetch(`${this._url}/users/me`, {
            method: 'GET',
            headers: {
                ...this._headers,
                Accept: 'application/json',
                Authorization: `Bearer ${token}`
            }
        })
        .then(res => res.ok ? res.json() : Promise.reject(`${res.status} ${res.statusText}`));
    }
}

const auth = new Auth({
    baseUrl: 'https://api.serezhaorlov.students.nomoredomains.club',
    headers: {
        "Content-Type": "application/json"
    }
})

export default auth;