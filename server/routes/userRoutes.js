import express from "express";
const userRouter = express.Router();
import { userController } from "../controllers/userController.js";
import authenticate from "../middleware/authenticate.js";
import isLoggedIn from "../middleware/isLoggedIn.js";

userRouter.post("/signup", isLoggedIn, userController.signUpUser);
userRouter.post("/signin",  isLoggedIn,userController.signInUser);
userRouter.get("/profile", authenticate, userController.getUserProfile);
userRouter.patch(
  "/update-profile",
  authenticate,
  userController.updateUserProfile
);
userRouter.get("/all-users", authenticate, userController.getAllUsers);
userRouter.delete("/delete-user/:id", authenticate, userController.deleteUser);
userRouter.get("/getCurrentUser", authenticate, userController.getCurrentUser);
userRouter.get("/logout", authenticate, userController.logoutUser);

export default userRouter;
