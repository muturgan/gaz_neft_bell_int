import type { Server } from 'http';
import { startServer } from '../start_server';
import axios from 'axios';
import config from '../nconf';

const host = config.get('host');
const port = config.get('port');


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
         url: `http://${host}:${port}/graphql`,
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
