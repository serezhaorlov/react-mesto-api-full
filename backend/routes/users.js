/* eslint-disable linebreak-style */

const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getUsers,
  getUser,
  getProfile,
  updateProfile,
  updateProfileAvatar,
} = require('../controllers/users');

router.get('/users', getUsers);
router.get('/users/me', getUser);
<<<<<<< HEAD
router.get('/users/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().alphanum().length(24).hex(),
  }),
}), getProfile);
=======
router.get('/users/:id', getProfile);
/*По валидации, у меня вроде бы все написано было изначально, гет запросы мы же не валидируем*/
>>>>>>> 3287ed780286a93bfcbdb9a3cb2d77b2180ffb45

router.patch(
  '/users/me',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      about: Joi.string().required().min(2).max(30),
    }),
  }),
  updateProfile,
);

router.patch(
  '/users/me/avatar',
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string()
        .required()
        .pattern(
          /^((http|https):\/\/)(www\.)?([\w\W\d]{1,})(\.)([\w\W\d]{1,})$/,
        ),
    }),
  }),
  updateProfileAvatar,
);

module.exports = router;
