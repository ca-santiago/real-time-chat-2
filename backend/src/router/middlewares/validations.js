const { validationResult } = require("express-validator");
const tokenService = require("../../services/token");
const { saveUserId } = require("../controllers/helpers");

const validateBody = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.mapped() });
  }
  next();
};

const validateToken = (req, res, next) => {
  try {
    const token = req.header("x-session-token");
    const tokenPayload = tokenService.validateToken(token);
    if (!tokenPayload) {
      return res.status(401).end();
    }
    saveUserId(req, tokenPayload.userId);
    next();
  } catch (err) {
    console.devlog("[validate-middleware] Error validating token");
    res.status(500).end();
  }
};

const middlewares = {
  validateBody,
  validateToken,
};

module.exports = middlewares;
