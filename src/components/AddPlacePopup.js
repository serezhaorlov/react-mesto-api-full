import React from 'react';
import PopupWithForm from './PopupWithForm.js';

function AddPlacePopup({ onClose, isOpened, onAddCard }) {

    const [name, setName] = React.useState('');
    const [link, setLink] = React.useState('');
    
    const handleChangeName = (e) => {
        setName(e.target.value);
    }

    const handleChangeLink = (e) => {
        setLink(e.target.value);
    }

    const handleSubmit  = (e) => {
        e.preventDefault();
        onAddCard(
            {
                name: name, 
                link: link
            } 
        )
    }

    const closeAllPopupsOverlay = (evt) => { 
        if (evt.target === evt.currentTarget){
          onClose()
        }
    }
    
    return (
        <PopupWithForm namePopup="popup popup-add" nameForm="form form-add" title="Новое место" button="Сохранить" 
            buttonLoad="Сохранение..." isOpened = { isOpened } onClose = { onClose } onSubmit={ handleSubmit }
            closeAllPopupsOverlay={ closeAllPopupsOverlay } >
            <>
            <input type="text" required minLength={2} maxLength={30} id="nameadd" name="name" placeholder="Название" className="form__name form__name_top_add-name" onChange={handleChangeName}/>
            <span id="nameadd-error" className="form__error" />
            <input type="url" required minLength={8} id="url" name="url" placeholder="Ссылка на картинку" className="form__name form__name_bottom_add-place" onChange={handleChangeLink}/>
            <span id="url-error" className="form__error" />
            </>
        </PopupWithForm>
        
    )
}

export default AddPlacePopup;