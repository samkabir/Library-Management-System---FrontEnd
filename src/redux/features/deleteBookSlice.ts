import type { ModalState } from "@/types";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type Book = {
  title: string;
  author: string;
  genre: string;
  isbn: string;
  copies: number;
  available: boolean;
  id: string;
};



const initialState: ModalState = {
  deleteModalOpen: false,
  selectedBook: null,
};

const deleteBookSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openDeleteModal: (state, action: PayloadAction<Book>) => {
      state.deleteModalOpen = true;
      state.selectedBook = action.payload;
    },
    closeDeleteModal: (state) => {
      state.deleteModalOpen = false;
      state.selectedBook = null;
    },
  },
});

export const { openDeleteModal, closeDeleteModal } = deleteBookSlice.actions;
export default deleteBookSlice.reducer;
