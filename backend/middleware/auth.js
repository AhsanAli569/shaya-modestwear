import jwt from "jsonwebtoken";

// Middleware to verify JWT token
export const verifyToken = (req, res, next) => {
  try {
    // Get token from header
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "No authentication token, access denied",
      });
    }

    // Verify token
    const verified = jwt.verify(token, "MY_SECRET_KEY");
    
    if (!verified) {
      return res.status(401).json({
        success: false,
        message: "Token verification failed, authorization denied",
      });
    }

    // Add user id to request
    req.userId = verified.id;
    next();
  } catch (err) {
    console.error("Auth middleware error:", err);
    
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Token has expired, please login again",
      });
    }
    
    res.status(401).json({
      success: false,
      message: "Invalid token, authorization denied",
    });
  }
};
