const { Router } = require("express");

const authRouter = Router();

authRouter.post("/", (req, res) => {
  res.end("Working");
});

module.exports = authRouter;
