import * as express from "express";
import {
  getBooks as getBooksService,
  getBookById,
  getBooksByTagId,
  getBooksByCategory,
} from "../services/book";

import { StatusCodes } from "http-status-codes";
import { BadRequestError } from "../utils/api-error";

interface ReqQuery extends express.Request {
  page: string;
  limit: string;
  category: string;
  keyword: string;
}

const router = express.Router();

const filterBooksByCategory = router.get(
  "/book/filter",
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      // #swagger.tags = ['books']
      // #swagger.summary = 'filter books by category'
      const category = req.query.category as string;
      const keyword = req.query.keyword as string;
      const page = req.query.page as string;
      const limit = req.query.limit as string;
      const books = await getBooksByCategory(category, keyword, page, limit);

      res.json({
        message: "Success. returning result for books by category",
        data: books,
        next: parseInt(page) + parseInt(limit),
      });
    } catch (err) {}
  }
);

const getBookDetail = router.get(
  "/book/:id/detail",
  async (req: express.Request, res: express.Response) => {
    // #swagger.tags = ['books']
    // #swagger.summary = 'Some summary...'
    const book = await getBookById(req.params.id);
    res.json({
      message: `Success. returning result for Book Id ${req.params.id}`,
      data: book,
    });
  }
);

const getBookByTag = router.get(
  "/book/:tagId/tag",
  async (req: express.Request, res: express.Response) => {
    // #swagger.tags = ['books']
    // #swagger.summary = 'Some summary...'
    const books = await getBooksByTagId(req.params.tagId);
    res.json({
      message: "Success. returning result for books by tag",
      data: books,
    });
  }
);

export { getBookDetail, getBookByTag, filterBooksByCategory };
