import { Router } from "express";
import { UserRouter } from "../modules/User/user.router";
import { CategoryRouter } from "../modules/Categories/category.router";
import { AddressRouter } from "../modules/Address/address.router";
import { OrdersRouter } from "../modules/Orders/order.router";
import { ProductRouter } from "../modules/Products/product.router";
import { AuthRoutes } from "../modules/Auth/auth.route";
import { VariantRouter } from "../modules/Variants/Variants.router";
const router = Router()
const moduleRoutes = [
    {
      path: '/users',
      route: UserRouter,
    },
    {
      path: '/categorys',
      route: CategoryRouter,
    },
    {
      path: '/address',
      route: AddressRouter,
    },
    {
      path: '/products',
      route: ProductRouter,
    },
    {
      path: '/auth',
      route: AuthRoutes,
    },
    {
      path: '/orders',
      route: OrdersRouter,
    },
    {
      path: '/variants',
      route: VariantRouter,
    },
]

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;