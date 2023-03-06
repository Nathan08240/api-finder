const jwt = require("jsonwebtoken");

const isAuth = (req, res, next) => {
  try {
    const bearer = req.headers.authorization;
    const token = bearer.replace("Bearer ", "");
    req.userData = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Authentification failed",
    });
  }
};

const isAdmin = (req, res, next) => {
  if (!req.userData || req.userData.role !== "support") {
    return res.status(401).json({
      message: "Role not authorized",
    });
  }
  next();
};

module.exports = {
  isAuth,
  isAdmin,
};
