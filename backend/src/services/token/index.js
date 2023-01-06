const jwt = require("jsonwebtoken");

const jwtSecret = process.env.JWT_SECRET || "my-secret";

const signToken = ({ userId }) => {
  return new Promise((resolve, reject) => {
    jwt.sign({ userId }, jwtSecret, { expiresIn: "24h" }, (err, token) => {
      if (err) {
        reject(err);
        console.devlog("[token-service] sign failed");
      }
      resolve(token);
    });
  });
};

const validateToken = (token) => {
  try {
    return jwt.verify(token, jwtSecret);
  } catch (err) {
    console.devlog("[token-service] Error verifying the token");
    return undefined;
  }
};

const tokenService = {
  signToken,
  validateToken,
};

module.exports = tokenService;
