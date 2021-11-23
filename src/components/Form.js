import { useRef, useState } from "react";
import { signup, login, logout, useAuth } from "../Firebase";
import classes from "../components/Form.module.css";

function Form() {
  const emailRef = useRef();
  const pwdRef = useRef();

  const [loading, setLoading] = useState(false);
  const curUser = useAuth();

  async function handleClickSignup() {
    setLoading(true);
    try {
      await signup(emailRef.current.value, pwdRef.current.value);
    } catch {
      alert("Error!");
    }
    setLoading(false);
  }

  async function handleClickLogin() {
    setLoading(true);
    try {
      await login(emailRef.current.value, pwdRef.current.value);
    } catch {
      alert("Error!");
    }
    setLoading(false);
  }

  async function handleClickLogout() {
    setLoading(true);
    try {
      await logout();
    } catch {
      alert("Error!");
    }
    setLoading(false);
  }

  let userEmail;
  if (curUser) {
    userEmail = "You are logged in using " + curUser.email;
  }
  else {
    userEmail = null;
  }

  return (
    <div className={classes.formComponent}>
      <h1>Welcome Buddy !</h1>
      <p>{userEmail}</p>
      <div className={classes.inputSection}>
        <input ref={emailRef} placeholder="E-mail" />
        <input ref={pwdRef} type="password" placeholder="Password" />
      </div>
      <div className={classes.buttonSection}>
        <button disabled={loading || curUser} onClick={handleClickSignup}>
          Sign Up
        </button>
        <button disabled={loading || curUser} onClick={handleClickLogin}>
          Log In
        </button>
        <button disabled={loading || !curUser} onClick={handleClickLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default Form;
