import * as express from "express";
import { StatusCodes } from "http-status-codes";
import {
  getCustomerPointsService,
  updateCustomerPointService,
} from "../services/customer";
import RequestValidator from "../utils/request-validator";
import { BadRequestError } from "../utils/api-error";
import { UpdatePointsDto } from "../dto/customer.dto";

const router = express.Router();

const getCustomerPoints = router.get(
  "/customer/:customerId/points",
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      //#swagger.tags = ['customer']
      //#swagger.summary = 'get customer points'

      const points = await getCustomerPointsService(req.params.customerId);
      res.json({
        message: "successfully getting customer points",
        data: points,
      });
    } catch (err) {
      if (err.statusCode === StatusCodes.NOT_FOUND) {
        next(new BadRequestError("Customer not found", ["Customer not found"]));
      }
    }
  }
);

const updateCustomerPoints = router.post(
  "/customer/update-points",
  RequestValidator.validate(UpdatePointsDto),
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      /*
        #swagger.tags = ['customer']
        #swagger.summary = 'update customer points'
    */
      const { customerId, points } = req.body;
      const addPoints = await updateCustomerPointService(customerId, points);
      res.json({
        message: "successfully adding bonus points",
        data: addPoints,
      });
    } catch (err) {
      if (err.statusCode === StatusCodes.NOT_FOUND) {
        next(new BadRequestError("Customer not found", ["Customer not found"]));
      }
    }
  }
);

export { getCustomerPoints, updateCustomerPoints };
