import React from 'react';
import { CurrentUserContext } from '../contexts/CurrenUserContext.js';
import PopupWithForm from './PopupWithForm.js';

function EditProfilePopup ({ onClose, isOpened, onUpdateUser }) {
  const user = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  React.useEffect(() => {
        setName(user.name);
        setDescription(user.about);
    }, [user]); 
    
  const handleSubmit = (e) => {
        e.preventDefault();
      
        onUpdateUser({
          name: name,
          about: description,
        });
  } 

  const handleChangeName = (e) => {
        setName(e.target.value);
  }

  const handleChangeDescription = (e) => {
        setDescription(e.target.value);
  }

  const closeAllPopupsOverlay = (evt) => { 
      if (evt.target === evt.currentTarget){
        onClose()
      }
  }
    
  return (
    	<PopupWithForm
            namePopup="popup" nameForm="form" title="Редактировать профиль"
            button="Сохранить" buttonLoad="Сохранение..." isOpened = { isOpened }
            onClose = { onClose } onSubmit={ handleSubmit } closeAllPopupsOverlay={ closeAllPopupsOverlay } 
        >
      	<>
        	<input type="text" required minLength={2} maxLength={40} id="name" name="name" placeholder="Имя" className="form__name form__name_top" value={name || '' } onChange={ handleChangeName }/>
        	<span id="name-error" className="form__error" />
        	<input type="text" required minLength={2} maxLength={200} id="about" name="about" placeholder="О себе" className="form__name form__name_bottom" value={description || ''} onChange={ handleChangeDescription }/>
        	<span id="about-error" className="form__error" />
      	</>
      	</PopupWithForm>
    )
} 

export default EditProfilePopup;