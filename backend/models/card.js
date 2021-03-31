/* eslint-disable no-underscore-dangle */
/* eslint-disable no-useless-escape */

const mongoose = require('mongoose');

const regex = /^https?:\/\/(www\.)?([a-zA-Z0-9\-])+\.([a-zA-Z])+\/?([a-zA-Z0-9\-\._~:\/\?#\[\]@!\$&'\(\)\*\+,;=]+)/mi;

const cardSchema = new mongoose.Schema({
  owner: {
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  name: {
    required: true,
    type: String,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    required: true,
    type: String,
    validate: {
      validator(v) {
        return regex.test(v);
      },
      message: 'Введите корректную ссылку!',
    },
  },
  likes: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, { versionKey: false });

module.exports = mongoose.model('card', cardSchema);
