import { useState } from "react";
import "./App.css";

function App() {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [labelEmail, setLabelEmail] = useState("");
  const [labelPassword, setLabelPassword] = useState(false);

  function handleInputEmail(e) {
    setMail(e.target.value);
    setLabelEmail("");
  }

  function handleInputPassword(e) {
    setPassword(e.target.value);
    setLabelPassword(false);
  }

  function sendData(e) {
    e.preventDefault();
    const checkEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const email = mail.trim().toLowerCase();

    if (email === "") {
      setLabelEmail("email-empty");
      return false;
    }
    if (!checkEmail.test(email)) {
      setLabelEmail("email-wrong");
      return false;
    }

    if (password === "") {
      setLabelPassword(true);
      return false;
    }
    console.log();
    fetch("https://jsonplaceholder.org/users", {
      method: "POST",
      "Content-Type": "application/json",
      body: JSON.stringify({
        email,
        password,
      }),
    });

    setMail("");
    setPassword("");
  }

  return (
    <>
      <div className="auth">
        <h1 className="auth-title">Авторизация</h1>
        <form
          className="form-login"
          action="https://jsonplaceholder.org/users"
          method="post"
          onSubmit={sendData}
        >
          <div className="form-login__wrap">
            <div className="form-hide__wrap">
              <label htmlFor="email" className="form-label">
                {labelEmail === "email-empty"
                  ? "Email не может быть пустым"
                  : labelEmail === "email-wrong"
                  ? "test@mail.ru формат ввода email"
                  : ""}
              </label>
              <input
                className="form-input"
                type="text"
                name="email"
                placeholder="Email"
                value={mail}
                onChange={handleInputEmail}
              />
            </div>
            <div className="form-hide__wrap">
              <label className="form-label" htmlFor="password">
                {labelPassword ? "Пароль не может быть пустым" : ""}
              </label>
              <input
                className="form-input"
                type="password"
                name="password"
                placeholder="Пароль"
                value={password}
                onChange={handleInputPassword}
              />
            </div>
            <div>
              <button className="form-btn" type="submit">
                Войти
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default App;
