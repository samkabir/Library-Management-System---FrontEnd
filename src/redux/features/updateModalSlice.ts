import type { UpdateModalState } from "@/types";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState: UpdateModalState = {
  open: false,
  selectedBook: null,
};

const updateModalSlice = createSlice({
  name: "updateModal",
  initialState,
  reducers: {
    openUpdateModal: (state, action: PayloadAction<UpdateModalState["selectedBook"]>) => {
      state.open = true;
      state.selectedBook = action.payload;
    },
    closeUpdateModal: (state) => {
      state.open = false;
      state.selectedBook = null;
    },
  },
});

export const { openUpdateModal, closeUpdateModal } = updateModalSlice.actions;
export default updateModalSlice.reducer;
