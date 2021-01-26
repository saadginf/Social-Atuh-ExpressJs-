const express = require("express");
const auth = require("../MiddleWare/auth");
const router = express.Router();
const users = require("../controllers/UserController");

router.post("/", users.create);
router.get("/", auth, (req, res) => {
  res.send("Protected Routes");
});
module.exports = router;
