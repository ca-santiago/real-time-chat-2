const saveUserId = (req, payload) => {
  req.metadata = {};
  req.metadata["userId"] = payload;
};

const getUserId = (req) => {
  if (!req.metadata) {
    throw new Error(
      "You should use middlewares.validateToken to have access to userId"
    );
  }
  return req.metadata["userId"] || null;
};

const contextHelpers = {
  saveUserId,
  getUserId,
};

module.exports = contextHelpers;
