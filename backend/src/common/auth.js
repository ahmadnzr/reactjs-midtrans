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
      return res.fail(403, {
        name: "FORBIDDEN",
        message: "You are not authenticated!",
      });
    }
    const user = userInfo(await admin.auth().verifyIdToken(token));
    req.user = user;
    next();
  } catch (err) {
    return res.fail(401, {
      name: "UNAUTHORIZED",
      message: "Token is not valid!",
    });
  }
});

module.exports = authorize;
