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


export interface TableSkeletonProps {
  rows?: number;
  columns?: number;
  showHeader?: boolean;
  columnWidths?: string[];
  headerLabels?: string[];
  showActionColumn?: boolean;
}
