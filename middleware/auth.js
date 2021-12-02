const jwt = require("jsonwebtoken"); // used to verify token
const config = require("config"); // access to secret

// Note: When using middleware functions, you need to call the 'next' function to indicate moving on to the next piece of middleware.
module.exports = function (req, res, next) {
  // Get token from header sent in the request object
  const token = req.header("x-auth-token");

  // Check if no token
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied." });
  }

  try {
    // Verify token with jwt. Then pull out the payload, and set the user in that payload to req.user so that we'll have access to req.user inside the protected route.
    const decoded = jwt.verify(token, config.get("jwtSecret"));

    // Assign user to req object
    req.user = decoded.user;
    next();
  } catch {
    res.status(401).json({ msg: "Token is not valid." });
  }
};
