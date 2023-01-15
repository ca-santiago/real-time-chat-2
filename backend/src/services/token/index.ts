import jwt from "jsonwebtoken";
const jwtSecret = process.env.JWT_SECRET || "my-secret";

const signToken = (payload: Record<any, any>) => {
  try {
    return jwt.sign(payload, jwtSecret, { expiresIn: "24h" });
  } catch (err) {
    throw new Error("[token-service] Error signing the token");
  }
};

const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, jwtSecret);
  } catch (err) {
    throw new Error("[token-service] Error verifying the token");
  }
};

const renewToken = (token: string) => {
  try {
    const payload = decodeToken(token) as any;
    const { iat, exp, ...args } = payload;
    return signToken({ ...args });
  } catch (err) {
    throw new Error("[token-service] Error renewing the token");
  }
};

const decodeToken = (token: string) => {
  try {
    return jwt.decode(token);
  } catch (err) {
    throw new Error("[token-service] Error decoding the token");
  }
};

const tokenService = { signToken, verifyToken, renewToken, decodeToken };
export default tokenService;
