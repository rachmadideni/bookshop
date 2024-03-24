import * as express from "express";
import {
  getBooks as getBooksService,
  getBookById,
  getBooksByTagId,
  getBooksByCategory,
} from "@/services/book";

interface ReqQuery {
  page: string;
  limit: string;
}

const router = express.Router();

const getBooks = router.get(
  "/book/",
  async (req: express.Request, res: express.Response) => {
    // #swagger.tags = ['books']
    // #swagger.summary = 'Some summary...'
    const { page, limit } = req.query as unknown as ReqQuery;
    const books = await getBooksService(page, limit);

    res.json({
      message: "Success. returning result for books",
      data: books,
      next: page + limit,
    });
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

const filterBooksByCategory = router.post(
  "/book/filter",
  async (req: express.Request, res: express.Response) => {
    // #swagger.tags = ['books']
    // #swagger.summary = 'Some summary...'
    const { category, keyword } = req.body;

    const [books, bookCount] = await getBooksByCategory(category, keyword);
    res.json({
      message: "Success. returning result for books by category",
      data: books,
      count: bookCount,
    });
  }
);

export { getBooks, getBookDetail, getBookByTag, filterBooksByCategory };
