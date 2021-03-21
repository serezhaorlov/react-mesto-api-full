import React from 'react';
import PopupWithForm from './PopupWithForm.js';

function EditAvatarPopup ({ onClose, isOpened, onUpdateAvatar }) {
    const avatarRef = React.useRef();

    const handleSubmit = (e) =>{
        e.preventDefault();
                
        onUpdateAvatar({
          avatar: avatarRef.current.value,
        });
        
        avatarRef.current.value = ''
    }

    const closeAllPopupsOverlay = (evt) => { 
      if (evt.target === evt.currentTarget){
        onClose()
      }
  }
  //прокинуть popupwithform
    return (
      <PopupWithForm namePopup="popup popup-profile" nameForm="form form-profile" title="Обновить аватар" button="Сохранить" 
      buttonLoad="Сохранение..." heading="form__heading_profile" isOpened = { isOpened } onClose = { onClose } onSubmit={ handleSubmit }
      closeAllPopupsOverlay={ closeAllPopupsOverlay }>
      <>
        <input type="url" required minLength={8} id="url" name="avatar" placeholder="Введите ссылку" className="form__name form__name_profile" ref={ avatarRef }></input>
        <span id="url-error" className="form__error" />
      </>
      </PopupWithForm>

    )
}

export default EditAvatarPopup;