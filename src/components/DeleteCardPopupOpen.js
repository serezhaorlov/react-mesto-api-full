import React from 'react';
import PopupWithForm from './PopupWithForm.js';

function DeleteCardPopupOpen ({ onClose, isOpened, handleCardDelete, cardToDelete }) {

    const closeAllPopupsOverlay = (evt) => { 
        if (evt.target === evt.currentTarget){
          onClose()
        }
    }

    const deleteCard = (evt) => {
        evt.preventDefault()
        handleCardDelete(cardToDelete)
    }
          
    return (
        <PopupWithForm namePopup="popup popup-delete" nameForm="form form-delete" title="Вы уверены?" heading="form__heading_delete-form"
        button="Да" buttonLoad="..." buttonStyle="form__button_delete-form" isOpened = { isOpened } onClose = { onClose } onSubmit={ deleteCard }
        closeAllPopupsOverlay={ closeAllPopupsOverlay } />
    )
  

}

export default DeleteCardPopupOpen;