import express from 'express';
import { getUserById, findAllUsers, addUser} from '../controller/user-controller.js';
import { authenticateToken } from "../middleware/auth.js";
import { validateRegister } from '../middleware/validator.js';

const userRouter = express.Router();

userRouter.route("/all").get(authenticateToken,findAllUsers);
userRouter.route("/:id").get(authenticateToken, getUserById);
userRouter.route("/register").post(validateRegister,addUser);

export default userRouter;