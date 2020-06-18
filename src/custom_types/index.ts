export interface IAuthor {
   authorId: number;
   name: string;
}

export interface IBook {
   bookId: number;
   name: string;
   pageCount: number;
   authorId: number;
   author: IAuthor;
}