import type { BookWithId } from "./book";


export interface ModalState {
  deleteModalOpen: boolean;
  selectedBook: BookWithId | null;
}

export interface UpdateModalState {
  open: boolean;
  selectedBook: BookWithId | null;
}

export interface BorrowModalState {
  open: boolean;
  selectedBook: BookWithId | null;
}