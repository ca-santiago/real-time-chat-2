const { check } = require("express-validator");
const createMessageInChat = require("../domain/message/create");
const getAllMessagesInChat = require("../domain/message/getAll");
const { validateBody } = require("../middlewares/validations");
const { getUserId } = require("./helpers");

const getMessagesInChat = async (req, res) => {
  try {
    const userId = getUserId(req);
    const { receiver, offset } = req.body;
    const data = await getAllMessagesInChat(userId, receiver, offset);
    res.status(200).json(data);
  } catch (err) {
    console.log("[messages] Failed loading messages");
    res.status(500).end();
  }
};

const createMessage = async (req, res) => {
  try {
    const userId = getUserId(req);
    const { receiver, content } = req.body;
    const data = await createMessageInChat({
      content,
      fromUser: userId,
      toUser: receiver,
    });
    res.status(200).json(data);
  } catch (err) {
    console.log("[messages-controller] Failed creating messages");
    res.status(500).end();
  }
};

// TODO: Nest validations in the controller itself
const validations = {
  getMessagesInChat: [
    check("receiver").exists(),
    validateBody,
  ],
  createMessage: [
    check("receiver").isUUID('4'),
    check("content").isString(),
    check("offset", "offset should be a number")
      .isNumeric({ no_symbols: true })
      .optional(),
    validateBody,
  ],
};

const messageControllers = {
  getMessagesInChat,
  createMessage,
  validations,
};

module.exports = messageControllers;
