const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  const token = req.header("x-auth-token");

  // we check if there is a token
  if (!token) return res.status(401).send("Access denied, No token provided");

  // verify token
  try {
    // jwt.verify() returns the payload, that we give it during the jwt.sign()
    const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY);

    // we add the user property to our request, so that we can access it eg req.user.name
    req.user = decoded;

    next();
  } catch (err) {
    res.send("Invalid token.");
  }
}
