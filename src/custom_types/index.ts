import type { Request } from 'express';


export type integer = number;

export type Tree = {[key: string]: null | Tree};

export interface IAuthor {
   authorId: integer;
   name: string;
}

export interface IBook {
   bookId: integer;
   name: string;
   pageCount: integer;
   authorId: integer;
   author: IAuthor;
}

export type TGetAuthorsQuery = {
   getAuthors: {
      authorId?: null;
      name?: null;
      books?: {
         bookId?: null;
         name?: null;
         pageCount?: null;
         authorId?: null;
      };
   };
};

export type TGetBooksQuery = {
   getBooks: {
      bookId?: null;
      name?: null;
      pageCount?: null;
      authorId?: null;
      author?: {
         authorId?: null;
         name?: null;
      };
   };
};

export interface ICtx {
   req: Request;
}