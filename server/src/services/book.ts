import { ILike } from "typeorm";
import { BookRepo } from "@/repositories/book";

const getBooks = async (page: string, limit: string) => {
  return await BookRepo.find({
    relations: ["tags"],
    take: parseInt(limit),
    skip: parseInt(page),
  });
};

const getBookById = async (bookId: string) => {
  return await BookRepo.findOne({
    relations: ["tags"],
    where: {
      id: bookId,
    },
  });
};

const getBooksByTagId = async (tagId: string) => {
  return await BookRepo.find({
    relations: ["tags"],
    where: {
      tags: {
        id: tagId,
      },
    },
  });
};

const getBooksByCategory = async (category: string, keyword: string) => {
  return await BookRepo.findAndCount({
    relations: ["tags"],
    where: {
      [category]: ILike(`%${keyword}%`),
    },
  });
};

export { getBooks, getBookById, getBooksByTagId, getBooksByCategory };
