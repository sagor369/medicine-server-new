"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRouter = void 0;
const express_1 = require("express");
const product_controller_1 = require("./product.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_const_1 = require("../User/user.const");
const product_validation_1 = require("./product.validation");
const router = (0, express_1.Router)();
router.post("/create-product", (0, auth_1.default)(user_const_1.USER_ROLE.superAdmin, user_const_1.USER_ROLE.admin), (0, validateRequest_1.default)(product_validation_1.productValidation), product_controller_1.productsController.createProduct);
router.get("/", product_controller_1.productsController.getAllProduct);
router.get("/:id", product_controller_1.productsController.getSingleProduct);
router.patch("/:id", (0, auth_1.default)(user_const_1.USER_ROLE.superAdmin, user_const_1.USER_ROLE.admin), product_controller_1.productsController.updateProduct);
router.delete("/:id", (0, auth_1.default)(user_const_1.USER_ROLE.superAdmin, user_const_1.USER_ROLE.admin), product_controller_1.productsController.deleteProduct);
exports.ProductRouter = router;
