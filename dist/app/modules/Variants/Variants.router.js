"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VariantRouter = void 0;
const express_1 = require("express");
const Variants_Controller_1 = require("./Variants.Controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_const_1 = require("../User/user.const");
const Variants_validation_1 = require("./Variants.validation");
const router = (0, express_1.Router)();
router.post("/create-variant", (0, validateRequest_1.default)(Variants_validation_1.VariantsValidation), Variants_Controller_1.VariantsController.createVariants);
router.get("/", Variants_Controller_1.VariantsController.getAllVariants);
router.get("/:id", Variants_Controller_1.VariantsController.getSingleVariants);
router.patch("/:id", (0, auth_1.default)(user_const_1.USER_ROLE.superAdmin, user_const_1.USER_ROLE.admin), Variants_Controller_1.VariantsController.updateVariants);
router.delete("/:id", (0, auth_1.default)(user_const_1.USER_ROLE.superAdmin, user_const_1.USER_ROLE.admin), Variants_Controller_1.VariantsController.deleteVariants);
exports.VariantRouter = router;
