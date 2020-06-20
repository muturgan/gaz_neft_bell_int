import type { Request } from 'express';
import type { Tree } from '../custom_types';


const open = '{';
const close = '}';
const purgeSpacesRE = /\s+/;


export const parseGqlQuery = <T = Tree>(ctx: {req: Request}): T =>
{
   const query: string = ctx.req.body.query;
   const splited = query.split(purgeSpacesRE);

   const jsonStr = splited.reduce((sum, next) => {
      switch (next) {
         case '':
            return sum;

         case open:
            return sum === ''
               ? next
               : sum + ':' + next;

         case close:
            const last = sum[sum.length - 1];
            return last === open || last === close
               ? sum + next
               : sum + ':null' + next;

         default:
            return sum[sum.length - 1] === open
               ? sum + `"${next}"`
               : sum + ':null,' + `"${next}"`;
      }
   }, '');

   const tree: T = JSON.parse(jsonStr);
   return tree;
};