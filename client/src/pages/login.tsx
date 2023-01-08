import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import useAppContext from "../hooks/useAppContext";
import authService from "../services/auth";

export const LoginPage = () => {
  const navigate = useNavigate();
  const { state, actions } = useAppContext();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleOnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    authService
      .login({
        password,
        email,
      })
      .then((token) => {
        actions.registerSession(token);
        console.log({ token });
      })
      .catch((err) => {
        console.log("Could not login");
      });
  };

  const handleRegisterRedirect = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    navigate("/register");
  };

  const enableNext: boolean = React.useMemo(() => {
    return !!(password && email);
  }, [password, email]);

  return (
    <div>
      <p>Session: {state.sessionToken}</p>
      <pre>{JSON.stringify(state)}</pre>
      <>{state.sessionToken && <Navigate to="/" />}</>
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
      <button disabled={!enableNext} onClick={handleOnClick}>
        Login
      </button>
      <p>
        Eres nuevo?{" "}
        <a href="/" onClick={handleRegisterRedirect}>
          Empieza aquí
        </a>
      </p>
    </div>
  );
};
