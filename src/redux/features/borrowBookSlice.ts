import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type Book = {
  id: string;
  title: string;
};

interface BorrowModalState {
  open: boolean;
  selectedBook: Book | null;
}

const initialState: BorrowModalState = {
  open: false,
  selectedBook: null,
};

const borrowModalSlice = createSlice({
  name: "borrowModal",
  initialState,
  reducers: {
    openBorrowModal: (state, action: PayloadAction<Book>) => {
      state.open = true;
      state.selectedBook = action.payload;
    },
    closeBorrowModal: (state) => {
      state.open = false;
      state.selectedBook = null;
    },
  },
});

export const { openBorrowModal, closeBorrowModal } = borrowModalSlice.actions;
export default borrowModalSlice.reducer;
