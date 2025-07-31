import jwt from "jsonwebtoken";

export const checkAuth = (req, res, next) => {
  try {
    let token = req.cookies.token;
    if (!token) {
      return res.status(400).json({ message: "User not authenticated" });
    }
    let decodedId = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.userId = decodedId.id;
    next();
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: "Sevrer side error" });
  }
};