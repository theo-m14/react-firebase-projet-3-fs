import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useRef, useState } from "react";
import { auth } from "../../utils/firebase.config";

const Login = () => {
  const email = useRef();
  const password = useRef();
  const [error, setError] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const user = await signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      );
      console.log(user);
    } catch (e) {
      setError(true);
      password.current.value = "";
    }
  };
  return (
    <div className="login-container">
      <div className="login">
        <h3>Se connecter</h3>
        <form className="form-login" onSubmit={(e) => handleLogin(e)}>
          <input type="text" placeholder="Email" required ref={email} />
          <input
            type="password"
            placeholder="Mot de passe"
            required
            ref={password}
          />
          <input type="submit" value="Se connecter" />
          <span>{error && "Le mail ou le mot de passe est incorrect"}</span>
        </form>
      </div>
    </div>
  );
};

export default Login;
