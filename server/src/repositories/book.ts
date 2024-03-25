import { dataSource } from "../config/database";
import { Book } from "../entities/book";

export const BookRepo = dataSource.getRepository(Book).extend({
  paginatedBooks() {
    return this.createQueryBuilder("book").getMany().paginate();
  },
});
