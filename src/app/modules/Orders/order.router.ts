import { Router } from "express";
import { OrdersController } from "./order.controller";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../User/user.const";
import validateRequest from "../../middlewares/validateRequest";
import { OrdersValidation } from "./order.validation";

const router = Router()
router.post("/create-order", validateRequest(OrdersValidation),auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.user), OrdersController.createOrders)
router.get("/" , OrdersController.getAllOrders)
router.get("/:orderId", OrdersController.getSingleOrders)
router.patch("/:orderId",auth(USER_ROLE.superAdmin, USER_ROLE.admin), OrdersController.updateOrders)
router.delete(":/orderId",auth(USER_ROLE.superAdmin, USER_ROLE.admin), OrdersController.deleteOrders)

export const OrdersRouter = router