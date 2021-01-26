const jwt = require("../auth/jwt");

const auth = (req, res, next) => {
  let authorization = req.get("authorization");
  if (!authorization) {
    return res.status(401).send("Access Denied.");
  }
  try {
    let token = authorization.replace("Bearer ", "");

    const decoded = jwt.verify(token);

    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).send("Invalid Token");
  }
};
module.exports = auth;
