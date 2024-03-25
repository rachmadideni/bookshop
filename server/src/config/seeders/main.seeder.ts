import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";
import { Book } from "../../entities/book";
import { Customer } from "../../entities/customer";
import { Tag } from "../../entities/tag";

const getRandomTags = (tags: Tag[]): Tag[] => {
  const numTags = Math.floor(Math.random() * tags.length) + 1;
  const shuffledTags = tags.sort(() => 0.5 - Math.random());
  return shuffledTags.slice(0, numTags);
};

export class MainSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager
  ): Promise<void> {
    const bookRepository = dataSource.getRepository(Book);
    const customerRepository = dataSource.getRepository(Customer);
    const tagRepository = dataSource.getRepository(Tag);

    const bookFactory = factoryManager.get(Book);

    const customerFactory = factoryManager.get(Customer);

    await tagRepository.insert([
      {
        name: "fiction",
      },
      {
        name: "non-fiction",
      },
      {
        name: "science",
      },
      {
        name: "essay",
      },
    ]);

    const customers = await Promise.all(
      Array(1)
        .fill("")
        .map(async () => {
          const cust = await customerFactory.make();
          return cust;
        })
    );

    await customerRepository.save(customers);

    const tags = await tagRepository.find();

    const books = await Promise.all(
      Array(100)
        .fill("")
        .map(async () => {
          const book = await bookFactory.make();
          const randomTags = getRandomTags(tags);
          book.tags = randomTags;
          await bookRepository.save(book);
          return book;
        })
    );

    await bookRepository.save(books);
  }
}
