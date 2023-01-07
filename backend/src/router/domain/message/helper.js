const getMessageDTO = (message) => {
  const { _id, __v, ...rest } = message;
  return { ...rest, id: _id };
};

module.exports = {
  getMessageDTO,
};
