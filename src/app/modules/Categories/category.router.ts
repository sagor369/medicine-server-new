import { Router } from "express";
import { CategoryController } from "./category.controller";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../User/user.const";
import validateRequest from "../../middlewares/validateRequest";
import { categoryValidation } from "./category.validation";

const router = Router()
router.post("/create-category", validateRequest(categoryValidation),auth(USER_ROLE.superAdmin, USER_ROLE.admin), CategoryController.createCategory)
router.get("/" , CategoryController.getAllCategory)
router.get("/:categoryId", CategoryController.getSingleCategory)
router.patch("/:categoryId",auth(USER_ROLE.superAdmin, USER_ROLE.admin), CategoryController.updateCategory)
router.delete(":/categoryId",auth(USER_ROLE.superAdmin, USER_ROLE.admin), CategoryController.deleteCategory)

export const CategoryRouter = router