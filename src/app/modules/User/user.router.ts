import { Router } from "express";
import { UserController } from "./user.controller";
import validateRequest from "../../middlewares/validateRequest";
import { UserValidation } from "./user.validation";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "./user.const";

const router = Router()

router.post("/register", validateRequest(UserValidation), UserController.postUser)
router.get("/", UserController.getAlluser)
router.get("/:id", UserController.getSingleUser)
router.patch("/:id",auth(USER_ROLE.superAdmin, USER_ROLE.admin), UserController.updateUser)
router.delete("/:id",auth(USER_ROLE.superAdmin, USER_ROLE.admin), UserController.deleteUser)

export const UserRouter= router