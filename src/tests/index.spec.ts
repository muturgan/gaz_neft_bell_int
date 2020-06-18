import { amswerMainQuestion } from '..';

describe('Suite', () =>
{
   describe('amswerMainQuestion', () =>
   {
      test('/CarListEx', async () =>
      {
         const answer = amswerMainQuestion();
         expect(answer).toBe(42);
      });
   });
});
