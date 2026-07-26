import jwt from "jsonwebtoken";

export function authUser(req, res, next) {
  try {
    // ✅ ek hi token variable use karo
    let token = req.cookies?.token;

    // 🔁 fallback header
    if (!token && req.headers.authorization) {
      token = req.headers.authorization.split(" ")[1];
    }

    console.log("👉 TOKEN:", token);

    if (!token) {
      return res.status(401).json({
        message: "Unauthorized",
        success: false,
        err: "No token provided",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log("✅ DECODED:", decoded);

    req.user = decoded;

    next();

  } catch (err) {
    console.log("❌ JWT ERROR:", err.message);

    return res.status(401).json({
      message: "Unauthorized",
      success: false,
      err: err.message,
    });
  }
}