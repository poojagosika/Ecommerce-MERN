import Profile from "../Model/profileModel.js";

export const sellerMiddleware = async (req, res, next) => {
  try {
    const user = await Profile.findOne({ _id: req.id });
    if (!user) {
      return res.status(404).json({ message: "Seller Profile is not found" });
    }
    if (user.role !== "seller") {
      return res.status(403).json({ message: "You are not authorized" });
    }
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
