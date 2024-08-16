"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_router_1 = require("../modules/User/user.router");
const category_router_1 = require("../modules/Categories/category.router");
const address_router_1 = require("../modules/Address/address.router");
const order_router_1 = require("../modules/Orders/order.router");
const product_router_1 = require("../modules/Products/product.router");
const auth_route_1 = require("../modules/Auth/auth.route");
const Variants_router_1 = require("../modules/Variants/Variants.router");
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: '/users',
        route: user_router_1.UserRouter,
    },
    {
        path: '/categorys',
        route: category_router_1.CategoryRouter,
    },
    {
        path: '/address',
        route: address_router_1.AddressRouter,
    },
    {
        path: '/products',
        route: product_router_1.ProductRouter,
    },
    {
        path: '/auth',
        route: auth_route_1.AuthRoutes,
    },
    {
        path: '/orders',
        route: order_router_1.OrdersRouter,
    },
    {
        path: '/variants',
        route: Variants_router_1.VariantRouter,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
