import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { OrdersServices } from "./order.services";

const createOrders = catchAsync(async (req, res) => {
    const result = await OrdersServices.createOrdersInToDb(req.body);
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Orders is craeted succesfully",
      data: result,
    });
  });
const getAllOrders = catchAsync(async (req, res) => {
    const result = await OrdersServices.getAllOrdersInToDb(req.query);
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Orders is retrieved succesfully",
      data: result,
    });
  });
const getSingleOrders = catchAsync(async (req, res) => {
    const {ordersId} = req.params
    const result = await OrdersServices.getSingleOrdersInToDb(ordersId);
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Orders is retrieved succesfully",
      data: result,
    });
  });
const updateOrders = catchAsync(async (req, res) => {
    const {ordersId} = req.params
    const result = await OrdersServices.updateOrdersInToDb(ordersId, req.body);
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Orders is update succesfully",
      data: result,
    });
  });
const deleteOrders = catchAsync(async (req, res) => {
    const {ordersId} = req.params
    const result = await OrdersServices.deleteOrdersInToDb(ordersId);
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Orders is delete succesfully",
      data: result,
    });
  });

  export const OrdersController = {
    createOrders,
    getAllOrders,
    getSingleOrders,
    updateOrders,
    deleteOrders
  }