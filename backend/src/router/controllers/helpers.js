const saveUserId = (req, payload) => {
  req.metadata = {};
  req.metadata["userId"] = payload;
};

const getUserId = (req) => {
  return req.metadata["userId"] || null;
};

const contextHelpers = {
  saveUserId,
  getUserId,
};

module.exports = contextHelpers;
