import { createSlice } from '@reduxjs/toolkit';

const priceSlice = createSlice({
  name: 'priceSlice',
  initialState: {
    price: {},
  },
  reducers: {
    setPrice: (state, action) => {
      const { cardId, price } = action.payload;
      state.price[cardId.cardId] = price;
    },
    deletePrice: (state, action) => {
      const cardId = action.payload;
      delete state.price[cardId];
    },
  },
});

export const { setPrice } = priceSlice.actions;
export default priceSlice.reducer;
