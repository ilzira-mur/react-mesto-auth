import React, { useState, useEffect } from 'react';

function Login(props) {
    const [email, setUsername] = useState('');
    const [password, setpassword] = useState('')

    const handleChangeUsername = (e) => {
    setUsername(e.target.value)
  }

  const handleChangePassword = (e) => {
    setpassword(e.target.value)
  }
  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) {
      return;
    }
    props.handleLogin(email, password);
    console.log(email, password)
  }

  useEffect(() => {
    if (props.loggedIn) {
      setUsername("");
      setpassword("");
    }
  }, [props.loggedIn]);
    

    return(
        <section className="login">
            <h2 className="login__title">Вход</h2>
            <form onSubmit={handleSubmit} className="login__form">
                <input className="login__input" id="username" required name="username" type="text" value={email} onChange={handleChangeUsername} placeholder="Email"/>
                <input className="login__input" id="password" required name="password" type="password" value={password} onChange={handleChangePassword} placeholder="Пароль"/>
                <button type="submit" className="button login__button">Войти</button>
            </form>
        </section>
    );
}

export default Login;