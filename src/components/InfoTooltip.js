import React from 'react';
import Success from '../images/Success.png'
import Failure from '../images/Failure.png'
function InfoTooltip({ tooltip, onClose }) {

    const closeAllPopupsOverlay = () => {
        onClose();
    }

    return (
    <section className={ tooltip.isOpen ? `popup-login popup_is-opened` : 'popup-login'} onClick={ closeAllPopupsOverlay }> 
        <section className='form form_logged'>
            {tooltip.success ?
            <>
                <img src={Success} alt="login-succes-pic" className="form__success"/> 
                <p className="form__message">Вы успешно зарегистрировались!</p>
            </>
             :
             <>
                <img src={Failure} alt="login-succes-pic" className="form__failure"/>
                <p className="form__message">Что-то пошло не так! Попробуйте ещё раз.</p>
             </>
             }
            <button id="button-close" type="button" className="form__close-button" onClick={ onClose } />
        </section>
    </section>
    )
}

export default InfoTooltip;