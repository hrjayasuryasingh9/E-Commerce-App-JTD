const jwt = require("jsonwebtoken");
const JWT_SECRET = "iamsuryasinghamernstackdevelopersince2023andilovetodocode";

const authenticateUser = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access Denied. No Token Provided." });
  }
  console.log(token);
  console.log(JWT_SECRET);
  try {
    const decoded = jwt.verify(token.split(" ")[1], JWT_SECRET);
    req.user = decoded;
    console.log(decoded);
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid or Expired Token" });
  }
};

module.exports = authenticateUser;
