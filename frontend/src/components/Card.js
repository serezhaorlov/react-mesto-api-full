import React from 'react';
import { CurrentUserContext } from '../contexts/CurrenUserContext.js';


function Card ({card, onCardClick, onCardLike, onCardDelete}) {
    const user = React.useContext(CurrentUserContext);
    
    const { _id } = user;
    const isOwn = card.owner === _id;
    const isLiked = card.likes.some(i => i === _id);

    return (
        <li className="elements__item">
            <img src={ card.link } alt={ card.name } className="elements__pic" onClick={() => onCardClick(card)}/>
            <button type="button" className={isOwn ? `elements__delete-button` : `elements__delete-button_unactive`} onClick={() => onCardDelete(card)}/>
            <div className="elements__container">
                <h2 className="elements__place-name">{ card.name }</h2>
                <div className="elements__like-container">
                    <button type="button" className={isLiked? `elements__like-button elements__like-button_pressed` : `elements__like-button`} onClick={() => onCardLike(card)} />
                    <p className="elements__like-counter">{ card.likes.length }</p>
                </div>
            </div>
        </li>
    )
}


export default Card;