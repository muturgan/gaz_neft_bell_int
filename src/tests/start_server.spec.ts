import { application } from '../start_server';
import axios, { AxiosRequestConfig } from 'axios';
import config from '../nconf';


describe(`let's test our resolvers...`, () =>
{
   const HOST = config.get('host');
   const PORT = config.get('port');

   const testAuthorName = 'Karl Marks';
   const testBookName = 'Das Kapital';
   const testPageCount = 777;
   let testAuthorId = 0;
   let testBookId = 0;


   const generateAxiosConfig = (query: string): AxiosRequestConfig =>
   {
      return {
         method: 'POST',
         url: `http://${HOST}:${PORT}/graphql`,
         headers: {
            'Content-Type': 'application/json',
         },
         data: {query},
      };
   };



   beforeAll(async () => {
      await application.start();
   });

   afterAll(async () => {
      await application.stop();
   });



   describe('hello resolver suite', () =>
   {
      test('hello world', async () =>
      {
         const answer = await axios.request(
            generateAxiosConfig(
               '{helloWorld}',
            ),
         )
         .then(res => res.data);

         expect(answer?.data?.helloWorld).toBe('Hello World!');
      });
   });



   describe('author resolver suite', () =>
   {
      test('add author', async () =>
      {
         const answer = await axios.request(
            generateAxiosConfig(
               `mutation {
                  addAuthor(input: {name: "${testAuthorName}"}) {
                     name
                     authorId
                  }
               }`,
            ),
         )
         .then(res => res.data);

         testAuthorId = Number(answer?.data?.addAuthor?.authorId);

         expect(answer?.data?.addAuthor?.name).toBe(testAuthorName);
      });

      test('get authors with books', async () =>
      {
         const answer = await axios.request(
            generateAxiosConfig(
               `{
                  getAuthors {
                     authorId
                     name
                     books {
                        name
                     }
                  }
               }`,
            ),
         )
         .then(res => res.data);

         expect(typeof answer?.data?.getAuthors?.[0]?.name).toBe('string');
         expect(Array.isArray(answer?.data?.getAuthors?.[0]?.books)).toBe(true);
      });

      test('get authors without books', async () =>
      {
         const answer = await axios.request(
            generateAxiosConfig(
               `{
                  getAuthors {
                     authorId
                     name
                  }
               }`,
            ),
         )
         .then(res => res.data);

         expect(typeof answer?.data?.getAuthors?.[0]?.name).toBe('string');
         expect('books' in answer?.data?.getAuthors?.[0]).toBe(false);
      });
   });



   describe('book resolver suite', () =>
   {
      test('add book', async () =>
      {
         const answer = await axios.request(
            generateAxiosConfig(
               `mutation {
                  addBook(input: {
                     name: "${testBookName}"
                     pageCount: ${testPageCount}
                     authorId: ${testAuthorId}
                  }) {
                     bookId
                     name
                  }
               }`,
            ),
         )
         .then(res => res.data);

         testBookId = Number(answer?.data?.addBook?.bookId);

         expect(answer?.data?.addBook?.name).toBe(testBookName);
      });

      test('get books with authors', async () =>
      {
         const answer = await axios.request(
            generateAxiosConfig(
               `{
                  getBooks {
                     name
                     author {
                        name
                     }
                  }
               }`,
            ),
         )
         .then(res => res.data);

         expect(typeof answer?.data?.getBooks?.[0]?.name).toBe('string');
         expect(typeof answer?.data?.getBooks?.[0]?.author?.name).toBe('string');
      });

      test('get books without authors', async () =>
      {
         const answer = await axios.request(
            generateAxiosConfig(
               `{
                  getBooks {
                     name
                  }
               }`,
            ),
         )
         .then(res => res.data);

         expect(typeof answer?.data?.getBooks?.[0]?.name).toBe('string');
         expect('author' in answer?.data?.getBooks?.[0]).toBe(false);
      });
   });



   describe('delete mutations testing (and test data clearing)', () =>
   {
      test('test book deleting', async () =>
      {
         const answer = await axios.request(
            generateAxiosConfig(
               `mutation {
                  deleteBook(input: {bookId: ${testBookId}})
               }`,
            ),
         )
         .then(res => res.data);

         expect(answer?.data?.deleteBook).toBe(true);
      });

      test('test author deleting', async () =>
      {
         const answer = await axios.request(
            generateAxiosConfig(
               `mutation {
                  deleteAuthor(input: {authorId: ${testAuthorId}})
               }`,
            ),
         )
         .then(res => res.data);

         expect(answer?.data?.deleteAuthor).toBe(true);
      });
   });

});
