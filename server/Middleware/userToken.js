import jwt from "jsonwebtoken";

export const userToken = async (req, res, next) => {
  const token = await req.header("Authorization").replace("Bearer ", "");
  if (!token) {
    return res.status(400).json({ message: "Login to Add in Cart" });
  }
  try {
    const verify = await jwt.verify(token, process.env.JWT_SECRET_CODE);
    req.id = verify._id;
    next();
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: "Invalid Token" });
  }
};
