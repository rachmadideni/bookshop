import * as express from "express";
import { StatusCodes } from "http-status-codes";
import { loginService } from "../services/auth";
import { NotFoundError } from "../utils/api-error";

const router = express.Router();

const login = router.post(
  "/auth/login",
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      //#swagger.tags = ['auth']
      //#swagger.summary = 'user/customer login'
      const user = await loginService();
      res.json({
        message: "Successfully logged in",
        data: user,
      });
    } catch (err) {
      if (err.statusCode === StatusCodes.NOT_FOUND) {
        next(new NotFoundError("Customer not found"));
      }
    }
  }
);

export { login };
