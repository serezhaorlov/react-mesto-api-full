import React from 'react';
import { Link } from 'react-router-dom';

function Register({ handleRegister }) {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const handleEmail = (e) => {
        setEmail(e.target.value);
    }

    const handlePassword = (e) => {
        setPassword(e.target.value);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        handleRegister({
            password: password,
            email: email
        })
    }

    return (
            <form id="form_register" className="form form_login" name="login-form" onSubmit={ onSubmit }>
                <h2 className='form__heading form__heading_login'>Регистрация</h2>
                <input type="email" required minLength={2} maxLength={40} id="name" name="name" placeholder="Email" className="form__name form__name_login" value={email || '' } onChange={ handleEmail }/>
                <span id="name-error" className="form__error" />
                <input type="password" required minLength={2} maxLength={200} id="about" name="about" placeholder="Пароль" className="form__name form__name_login" value={password || ''} onChange={ handlePassword }/>
                <span id="about-error" className="form__error" />
                <button type="submit" id="submit-button" value="Сохранить" className='form__button form__button_login'>Зарегистрироваться</button>
                <Link to="/signin" className="form__link">Уже зарегистрированы? Войти</Link>
            </form>
    )
}

export default Register;