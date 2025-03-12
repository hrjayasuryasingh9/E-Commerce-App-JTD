const authorizeUser = (allowedRoles) => {
  return (req, res, next) => {
    if (!allowedRoles.includes(req.user.role)) {
      return res
        .status(403)
        .json({ message: "Forbidden: You don’t have permission." });
    }
    next();
  };
};

module.exports = authorizeUser;
