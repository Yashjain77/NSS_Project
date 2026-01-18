const jwt = require("jsonwebtoken");

module.exports = (role) => (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ msg: "No token" });

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  if (role && decoded.role !== role)
    return res.status(403).json({ msg: "Forbidden" });

  req.user = decoded;
  next();
};
