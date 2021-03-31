const Card = require('../models/card');
const NotFoundError = require('../errors/not-found-error');
const ForbiddenError = require('../errors/forbidden-error');

const getCards = (req, res, next) => {
  Card.find({})
    .orFail(() => { throw new NotFoundError('Не создано ни одной карточки!'); })
    .then((cards) => res.status(200).send(cards))
    .catch((err) => next(err));
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => {
      res.status(200).send(card);
    })
    .catch((err) => {
      next(err);
    });
};

const deleteCard = (req, res, next) => {
  const owner = req.user._id;
  Card.findOne({ _id: req.params.cardId })
    .orFail(() => {
      throw new NotFoundError('Данные не найдены');
    })
    .then((card) => {
      if (String(card.owner) !== owner) {
        throw new ForbiddenError('Недостаточно прав');
      }
      return Card.findByIdAndRemove(card._id);
    })
    .then(() => {
      res.status(200).send({ message: 'Карточка удалена' });
    })
    .catch((err) => {
      next(err);
    });
};

const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => { throw new NotFoundError('Данные не найдены'); })
    .then((cardLiked) => { res.status(200).send(cardLiked); })
    .catch((err) => { next(err); });
};

const dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      throw new NotFoundError('Данные не найдены');
    })
    .then((cardDisliked) => {
      res.status(200).send(cardDisliked);
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
