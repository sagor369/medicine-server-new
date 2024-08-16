"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressRouter = void 0;
const express_1 = require("express");
const address_Controller_1 = require("./address.Controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_const_1 = require("../User/user.const");
const address_validation_1 = require("./address.validation");
const router = (0, express_1.Router)();
router.post("/create-address", (0, validateRequest_1.default)(address_validation_1.AddressValidation), (0, auth_1.default)(user_const_1.USER_ROLE.superAdmin, user_const_1.USER_ROLE.admin, user_const_1.USER_ROLE.user), address_Controller_1.AddressController.createAddress);
router.get("/", address_Controller_1.AddressController.getAllAddress);
router.get("/:id", address_Controller_1.AddressController.getSingleAddress);
router.patch("/:id", (0, auth_1.default)(user_const_1.USER_ROLE.user), address_Controller_1.AddressController.updateAddress);
router.delete("/:id", (0, auth_1.default)(user_const_1.USER_ROLE.superAdmin, user_const_1.USER_ROLE.admin, user_const_1.USER_ROLE.user), address_Controller_1.AddressController.deleteAddress);
exports.AddressRouter = router;
