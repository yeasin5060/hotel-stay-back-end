import User from "../models/user.model.js";

export const protect = async (req, res, next) => {
  try {
    const auth = req.auth?.(); // ✅ Call as function

    if (!auth || !auth.userId) {
      return res.status(401).json({ success: false, message: "Not authenticated" });
    }

    const user = await User.findById(auth.userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    req.user = user;
    next();
  } catch (err) {
    console.error("Protect middleware error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};