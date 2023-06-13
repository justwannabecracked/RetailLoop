const jwt = require("jsonwebtoken");
const { UnAuthenticated } = require("../errors");

const authenticationMiddleware = async (req, res, next) => {
  const token = req.header("retailloop-token");

  if (!token) {
    return res.status(401).json({
      msg: "No Token, Authorization Denied",
      status: false,
    });
  }

  try {
    const payload = jwt.verify(token, process.env.JWTSECRET);
    req.user = payload.user;
    next();
  } catch (error) {
    throw new UnAuthenticated("Not Authorized. Please Enter a Valid Token");
  }
};

module.exports = authenticationMiddleware;
