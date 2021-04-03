import { apiObj } from './utils.js'

class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl
    this._headers = options.headers;
  }

  setHeaders(token) {
    this._headers = {
        ...this._headers,
        authorization: `Bearer ${token}`,
    }
  }

  getUser(){
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: this._headers,
    }).then((res) => {
      if (res.ok) {
        return res.json()
      }
      return Promise.reject("Mistakes there made")
      });
  }

  editProfile({name, about}){
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about
      })
    }).then((res) => {
      if (res.ok) {
        return res.json()
      }
      return Promise.reject("Mistakes there made")
      });
  }

  changeUserPic(data) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(data)
    }).then((res) => {
      if (res.ok) {
        return res.json()
      }
      return Promise.reject("Mistakes there made")
      });
  }

  getCards(){
    return fetch(`${this._baseUrl}/cards`, {
      method: 'GET',
      headers: this._headers,
    }).then((res) => {
      if (res.ok) {
        return res.json()
      }
      return Promise.reject("Mistakes there made")
      });
  }

  addCard({ name, link }){
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name,
        link,
      })
    }).then((res) => {
      if (res.ok) {
        return res.json()
      }
      return Promise.reject("Mistakes there made")
      });
  }

  deleteCard(cardId){
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    }).then((res) => {
      if (res.ok) {
        return res.json()
      }
      return Promise.reject("Mistakes there made")
      })
  }

  likesChanges(cardId, isLiked) { 
    if (isLiked) {
      return fetch(`${this._baseUrl}/cards/${cardId}/likes/`, {
      method: 'PUT',
      headers: this._headers,
    }).then((res) => {
      if (res.ok) {
        return res.json()
      }
      return Promise.reject("Mistakes there made")
      })
    } 
    if (!isLiked){
      return fetch(`${this._baseUrl}/cards/${cardId}/likes/`, {
        method: 'DELETE',
        headers: this._headers,
      }).then((res) => {
        if (res.ok) {
          return res.json()
        }
        return Promise.reject("Mistakes there made")
        })
    }
  }
}

export const api = new Api({
  baseUrl: 'https://api.serezhaorlov.students.nomoredomains.club',
  headers: {
    "content-type": "application/json"
  },
})
