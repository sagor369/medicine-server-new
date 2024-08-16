import { Router } from "express";
import { AddressController } from "./address.Controller";
import validateRequest from "../../middlewares/validateRequest";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../User/user.const";
import { AddressValidation } from "./address.validation";

const router = Router()

router.post("/create-address", validateRequest(AddressValidation),auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.user), AddressController.createAddress)
router.get("/", AddressController.getAllAddress)
router.get("/:id", AddressController.getSingleAddress)
router.patch("/:id",auth(USER_ROLE.user), AddressController.updateAddress)
router.delete("/:id",auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.user), AddressController.deleteAddress)

export const AddressRouter= router