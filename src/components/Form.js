import { useRef, useState } from "react";
import { signup, login, logout, useAuth } from "../Firebase";

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

  return (
    <>
      <h1>Hi {curUser?.email}!</h1>
      <div>
        <input ref={emailRef} placeholder="email" />
        <input ref={pwdRef} type="password" placeholder="password" />
      </div>
      <div>
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
    </>
  );
}

export default Form;
