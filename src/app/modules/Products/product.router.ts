import { Router } from "express";
import { productsController } from "./product.controller";
import validateRequest from "../../middlewares/validateRequest";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../User/user.const";
import { productValidation } from "./product.validation";

const router = Router()

router.post("/create-product",auth(USER_ROLE.superAdmin, USER_ROLE.admin), validateRequest(productValidation), productsController.createProduct)
router.get("/", productsController.getAllProduct)
router.get("/:id", productsController.getSingleProduct)
router.patch("/:id",auth(USER_ROLE.superAdmin, USER_ROLE.admin), productsController.updateProduct)
router.delete("/:id",auth(USER_ROLE.superAdmin, USER_ROLE.admin), productsController.deleteProduct)

export const ProductRouter= router