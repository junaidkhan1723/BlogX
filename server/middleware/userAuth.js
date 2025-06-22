import jwt from "jsonwebtoken";

const userAuth = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized: No token provided",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded.id) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: Invalid token structure",
      });
    }

    req.userId = decoded.id; // ✅ Attach user ID to request object
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized: " + error.message,
    });
  }
};

export default userAuth;
