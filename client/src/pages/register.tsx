import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import useAppContext from "../hooks/useAppContext";
import authService from "../services/auth";

export const RegisterPage = () => {
  const navigate = useNavigate();
  const {
    state: { sessionToken },
    actions,
  } = useAppContext();
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleOnRegisterClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    authService
      .registerUser({
        username,
        password,
        email,
      })
      .then((token) => {
        actions.registerSession(token);
        console.log({ token });
      })
      .catch((err) => {
        console.log("Error creating account");
      });
  };

  const handleLoginRedirect = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    navigate("/login");
  };

  const enableNext: boolean = React.useMemo(() => {
    return !!(username && password && email);
  }, [username, password, email]);

  return (
    <div>
      {sessionToken && <Navigate to="/" />}
      <input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="username"
        name="username"
      />
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="email"
        name="email"
      />
      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="password"
        name="passowrd"
      />
      <button disabled={!enableNext} onClick={handleOnRegisterClick}>
        Register
      </button>
      <p>
        Ya tienes cuenta?{" "}
        <a href="/" onClick={handleLoginRedirect}>
          Ingresa aquí
        </a>
      </p>
    </div>
  );
};
