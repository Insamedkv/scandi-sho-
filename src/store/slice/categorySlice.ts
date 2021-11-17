import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CategoryStoreState {
  value: string,
  currency: string,
}

const initialState: CategoryStoreState = {
  value: 'clothes',
  currency: 'USD',
};

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    changeCategory: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
    changeCurrency: (state, action: PayloadAction<string>) => {
      state.currency = action.payload;
    },
  },
});

export const { changeCategory, changeCurrency } = categorySlice.actions;

export default categorySlice;
