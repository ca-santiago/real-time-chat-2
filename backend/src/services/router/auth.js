const { Router } = require("express");

const authRouter = Router();

authRouter.get("/", (req, res) => {
  res.end("Working");
});

module.exports = authRouter;
