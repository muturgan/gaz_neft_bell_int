import axios from 'axios';
import { startServer } from '../start_server';
import type { Server } from 'http';

describe('testing our server', () =>
{
   let server: Server;

   beforeAll(async () => {
      server = await startServer();
   });

   afterAll(() => {
      server.close();
   });


   test('hello world', async () =>
   {
      const answer = await axios.request({
         method: 'POST',
         url: 'http://localhost:3333/graphql',
         headers: {
            'Content-Type': 'application/json',
         },
         data: {
            query: '{helloWorld}',
         },
      })
      .then(res => res.data);

      expect(answer.data.helloWorld).toBe('Hello World!');
   });
});
