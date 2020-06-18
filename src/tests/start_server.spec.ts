import type { Server } from 'http';
import { startServer } from '../start_server';
import axios from 'axios';
import config from '../nconf';

const HOST = config.get('host');
const PORT = config.get('port');


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
         url: `http://${HOST}:${PORT}/graphql`,
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
