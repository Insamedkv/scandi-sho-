import { configureStore } from '@reduxjs/toolkit';
import categoryReducer from './slice/categorySlice';
import cartReducer from './slice/cartSlice';

export const store = configureStore({
  reducer: {
    category: categoryReducer.reducer,
    cart: cartReducer.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
