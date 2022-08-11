const admin = require("./firebaseConfig");
const { asyncWrapper } = require("./utils");

const getToken = (authorizationHeader = "") => {
  const splittedHeader = authorizationHeader.split("Bearer ")[1];
  return splittedHeader;
};

const userInfo = (user) => {
  const {
    name = "",
    picture = "",
    uid = "",
    email = "",
    email_verified = false,
  } = user;

  return { name, picture, uid, email, email_verified };
};

const authorize = asyncWrapper(async (req, res, next) => {
  try {
    const token = getToken(req.headers.authorization);
    if (!token) {
      console.log("need login");
      return res.status(403).json({
        name: "FORBIDDEN",
        message: "You are not authenticated!",
      });
    }
    const user = userInfo(await admin.auth().verifyIdToken(token));
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({
      name: "UNAUTHORIZED",
      message: "Token is not valid!",
    });
  }
});

module.exports = authorize;
