import { apiObj } from './utils.js'

class Api {
  constructor(options) {
    this._cardsUrl = options.cardsUrl;
    this._myProfileUrl = options.myProfileUrl;
    this._cardLikeUrl = options.cardLikeURl;
    this._headers = options.headers;
  }

  setHeaders(token) {
    this._headers = {
        ...this._headers,
        authorization: `Bearer ${token}`,
    }
  }

  getUser(){
    return fetch(this._myProfileUrl, {
      method: 'GET',
      headers: this._headers,
    }).then((res) => {
      if (res.ok) {
        return res.json()
      }
      return Promise.reject("Mistakes there made")
      });
  }

  editProfile(data){
    return fetch(this._myProfileUrl, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    }).then((res) => {
      if (res.ok) {
        return res.json()
      }
      return Promise.reject("Mistakes there made")
      });
  }

  changeUserPic(data) {
    return fetch('https://mesto.nomoreparties.co/v1/cohort-18/users/me/avatar', {
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
    return fetch(this._cardsUrl, {
      method: 'GET',
      headers: this._headers,
    }).then((res) => {
      if (res.ok) {
        return res.json()
      }
      return Promise.reject("Mistakes there made")
      });
  }

  addCard(data){
    return fetch(this._cardsUrl, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(data)
    }).then((res) => {
      if (res.ok) {
        return res.json()
      }
      return Promise.reject("Mistakes there made")
      });
  }

  deleteCard(cardId){
    return fetch(`https://mesto.nomoreparties.co/v1/cohort-18/cards/${cardId}`, {
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
      return fetch(`https://mesto.nomoreparties.co/v1/cohort-18/cards/likes/${cardId}`, {
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
      return fetch(`https://mesto.nomoreparties.co/v1/cohort-18/cards/likes/${cardId}`, {
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

export const api = new Api(apiObj)

/* 
import { apiObj } from './utils.js'

class Api {
  constructor(options) {
    this._baseUrl = options.base
    this._cardsUrl = options.cardsUrl;
    this._myProfileUrl = options.myProfileUrl;
    this._cardLikeUrl = options.cardLikeURl;
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

  editProfile(data){
    return fetch(this._myProfileUrl, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    }).then((res) => {
      if (res.ok) {
        return res.json()
      }
      return Promise.reject("Mistakes there made")
      });
  }

  changeUserPic(data) {
    return fetch('https://mesto.nomoreparties.co/v1/cohort-18/users/me/avatar', {
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
    return fetch(`${this._baseUrl}/v1/cohort-18/cards`, {
      method: 'GET',
      headers: this._headers,
    }).then((res) => {
      if (res.ok) {
        return res.json()
      }
      return Promise.reject("Mistakes there made")
      });
  }

  addCard(data){
    return fetch(`${this._baseUrl}/v1/cohort-18/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(data)
    }).then((res) => {
      if (res.ok) {
        return res.json()
      }
      return Promise.reject("Mistakes there made")
      });
  }

  deleteCard(cardId){
    return fetch(`${this._baseUrl}/v1/cohort-18/cards/${cardId}`, {
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
      return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
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
      return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
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

export const api = new Api(apiObj) */