"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersRouter = void 0;
const express_1 = require("express");
const order_controller_1 = require("./order.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_const_1 = require("../User/user.const");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const order_validation_1 = require("./order.validation");
const router = (0, express_1.Router)();
router.post("/create-order", (0, validateRequest_1.default)(order_validation_1.OrdersValidation), (0, auth_1.default)(user_const_1.USER_ROLE.superAdmin, user_const_1.USER_ROLE.admin, user_const_1.USER_ROLE.user), order_controller_1.OrdersController.createOrders);
router.get("/", order_controller_1.OrdersController.getAllOrders);
router.get("/:orderId", order_controller_1.OrdersController.getSingleOrders);
router.patch("/:orderId", (0, auth_1.default)(user_const_1.USER_ROLE.superAdmin, user_const_1.USER_ROLE.admin), order_controller_1.OrdersController.updateOrders);
router.delete(":/orderId", (0, auth_1.default)(user_const_1.USER_ROLE.superAdmin, user_const_1.USER_ROLE.admin), order_controller_1.OrdersController.deleteOrders);
exports.OrdersRouter = router;
