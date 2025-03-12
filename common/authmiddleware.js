// const { verifyToken } = require("./token");

// const isAuthorized = (role) => {
//   return (req, res, next) => {
//     const token = req.cookies.token;
//     console.log(token);

//     if (!token) {
//       res.json({ message: "Token missing" });
//       return;
//     }
//     const user = verifyToken(token);
//     console.log(user.role);
//     if (!user) {
//       res.json({ message: "You cannot access this page" });
//       return;
//     }
//     if (role !== user.role) {
//       res.json({ message: "Unauthorized role" });
//       return;
//     }
//     req.user = user;

//     next();
//   };
// };

// module.exports = { isAuthorized };

const { verifyToken } = require("./token");

const isAuthorized = (...allowedRoles) => {
  return (req, res, next) => {
    const token = req.cookies.token;
    console.log(token);

    if (!token) {
      return res.json({ message: "Token missing" });
    }

    const user = verifyToken(token);
    console.log(user.role);

    if (!user) {
      return res.json({ message: "You cannot access this page" });
    }

    if (!allowedRoles.includes(user.role)) {
      return res.json({ message: "Unauthorized role" });
    }

    req.user = user;
    next();
  };
};

module.exports = { isAuthorized };
