import React from 'react';
import Card from './Card.js';
import { CurrentUserContext } from '../contexts/CurrenUserContext.js';

function Main ({ onEditAvatar, onEditProfile, onAddPlace, onCardClick, handleCardLike, handleCardDelete, cards }) {
    const user = React.useContext(CurrentUserContext);    
    const { name, about, avatar } = user;
    
     return (
        <main className="main">
            <section className="profile">
            <img src={ avatar } alt="аватар" className="profile__avatar"/>
            <button type="button" className="profile__pic-edit" onClick={ onEditAvatar }/>
            <div className="profile__info">
                <h1 className="profile__name">{ name }</h1>
                <p className="profile__sub-info">{ about }</p>
                <button type="button" className="profile__edit-button" onClick={ onEditProfile }/>
            </div>
            <button type="button" className="profile__add-button" onClick={ onAddPlace }/>
            </section>
            <ul className="elements">
                {cards.map((card) => (<Card key={ card._id } card={ card } onCardClick={ onCardClick } onCardLike={ handleCardLike } onCardDelete={ handleCardDelete } />))}
            </ul>
        </main>
    )
}


export default Main;


