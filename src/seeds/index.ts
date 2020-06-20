import { initDatabase } from '../init_db';
import { Author, Book } from '../entities';
import { authorSeeds } from './author.seed';
import { bookSeeds } from './book.seed';

const addSeeds = async (): Promise<void> =>
{
   try {
      const conn = await initDatabase();

      await Author.save(
         authorSeeds.map(a => Author.create(a)),
      );
      await Book.save(
         bookSeeds.map(b => Book.create(b)),
      );

      await conn.close();
      console.info('the seeds were successfully inserted into the database...');

   } catch (err) {
      console.error('seeds inserting error: ', err);
   }
};

addSeeds();