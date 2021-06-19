import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Register({ handleRegister }) {
    const [email, setUsername] = useState('');
    const [password, setpassword] = useState('')
    

    
  const handleChangeUsername = (e) => {
    setUsername(e.target.value)
  }

  const handleChangePassword = (e) => {
    setpassword(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegister(email, password);
  }

    return(
        <section className="login">
            <h2 className="login__title">Регистрация</h2>
            <form onSubmit={handleSubmit} className="login__form">
                <input className="login__input" id="username" required name="username" type="text" value={email} onChange={handleChangeUsername} placeholder="Email"/>
                <input className="login__input" id="password" required name="password" type="password" value={password} onChange={handleChangePassword} placeholder="Пароль"/>
                <button type="submit" className="button login__button">Зарегистрироваться</button>
            </form>
            <div className="login__signin">
                <p className="login__signin-text">Уже зарегистрированы?</p>
                <Link to="/sign-in" className="login__signin-text login__signin-link">Войти</Link>
            </div>
        </section>
    );
}

export default Register;