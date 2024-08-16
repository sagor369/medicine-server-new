import { Router } from "express";
import { VariantsController } from "./Variants.Controller";
import validateRequest from "../../middlewares/validateRequest";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../User/user.const";
import { VariantsValidation } from "./Variants.validation";

const router = Router()

router.post("/create-variant", validateRequest(VariantsValidation), VariantsController.createVariants)
router.get("/", VariantsController.getAllVariants)
router.get("/:id", VariantsController.getSingleVariants)
router.patch("/:id",auth(USER_ROLE.superAdmin, USER_ROLE.admin), VariantsController.updateVariants)
router.delete("/:id",auth(USER_ROLE.superAdmin, USER_ROLE.admin), VariantsController.deleteVariants)

export const VariantRouter= router