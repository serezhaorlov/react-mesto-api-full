import React from 'react';

function ImagePopup ({ namePopup, card, onClose }){
  const { name, link } = card;  

  const closeAllPopupsOverlay = (evt) => {
       if (evt.target === evt.currentTarget){
        onClose()
      }
    }

  return (
    <section className={card.link !== '' ? `${ namePopup } popup_is-opened` : namePopup } onClick={ closeAllPopupsOverlay }> 
      <div className="popup-pic__content-container">
        <button id="button-close" type="button" className="popup-pic__close-button-pic" onClick={ onClose }/>
        <img src={ link } alt={ name } className="popup-pic__image"/>
        <p className="popup-pic__text">{ name }</p>
      </div>
    </section>
  )
}


export default ImagePopup;