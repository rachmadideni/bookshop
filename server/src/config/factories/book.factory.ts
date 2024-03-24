import { Faker } from "@faker-js/faker";
import { setSeederFactory } from "typeorm-extension";
import { Book } from "@/entities/book";

export const BookFactory = setSeederFactory(Book, (faker: Faker) => {
  const book = new Book();
  book.title = faker.lorem.words();
  book.writer = faker.person.fullName();
  book.coverImage = faker.image.urlLoremFlickr({ category: "book" });
  book.price = faker.commerce.price({ min: 10, max: 90 });
  return book;
});
