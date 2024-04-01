import { ILike } from "typeorm";
import { BookRepo } from "../repositories/book";
import { BadRequestError } from "../utils/api-error";

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

const getBooksByCategory = async (
  category: string,
  keyword: string,
  page: string,
  limit: string
) => {
  const validCategoryColumns = BookRepo.metadata.columns
    .map((column) => column.propertyName)
    .filter(
      (columnName) =>
        columnName !== "id" &&
        columnName !== "coverImage" &&
        columnName !== "price"
    );

  if (category !== "" && typeof category !== "undefined") {
    if (!validCategoryColumns.includes(category) && category !== "")
      throw new BadRequestError(
        `${category} is not a valid category. Please use one of the following (${validCategoryColumns})`,
        [`${category} is not a valid category`]
      );
  }

  const conditions =
    category !== "" &&
    typeof category !== "undefined" &&
    keyword !== "" &&
    typeof keyword !== "undefined"
      ? { where: { [category]: ILike(`%${keyword}%`) } }
      : {};

  return await BookRepo.find({
    relations: ["tags"],
    ...conditions,
    take: parseInt(limit),
    skip: parseInt(page),
  });
};

export { getBooks, getBookById, getBooksByTagId, getBooksByCategory };
