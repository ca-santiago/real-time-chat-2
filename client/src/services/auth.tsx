const baseURL = "http://localhost:3030/auth";

interface IRegisterUser {
  username: string;
  email: string;
  password: string;
}

const registerUser = async ({ username, email, password }: IRegisterUser) => {
  return fetch(`${baseURL}/register`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: username, email, password }),
  })
    .then((data) => {
      const payload = data.json();
      if (data.status === 200) return payload;
      throw new Error();
    })
    .then((data) => data.token);
};

interface ILogin {
  email: string;
  password: string;
}

const login = async ({ email, password }: ILogin) => {
  return fetch(`${baseURL}/login`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then((data) => {
      const payload = data.json();
      if (data.status === 200) return payload;
      throw new Error();
    })
    .then((data) => data.token);
};

const authService = {
  registerUser,
  login,
};

export default authService;
