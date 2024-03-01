import Express from "express";
import {
  userLogin,
  userRegister,
  updateProfile,
} from "../Controller/userController.js";
import {userToken} from "../Middleware/userToken.js";

const userRouter = Express.Router();

userRouter.post("/register", userRegister);
userRouter.post("/login", userLogin);
userRouter.put("/update", userToken, updateProfile);

export default userRouter;
