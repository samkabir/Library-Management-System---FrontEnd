export interface IBook {
  title: string;
  author: string;
  genre: string;
  isbn: string;
  description?: string;
  copies: number;
  available: boolean;
}

export interface Book extends IBook {
  _id: string;
}

export interface BookWithId extends IBook {
  id: string;
}

export interface BookSummary {
  id: string;
  title: string;
  copies: number;
}

export interface BorrowBook {
  title: string;
  isbn: string;
}

export interface Borrow {
  book: BorrowBook;
  totalQuantity: number;
}