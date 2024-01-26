import { createSlice } from '@reduxjs/toolkit';

const ageSlice = createSlice({
  name: 'ageSlice',
  initialState: {
    ageRanges: {},
  },
  reducers: {
    setAge: (state, action) => {
      const { cardId, startAge, endAge } = action.payload;
      if (startAge !== undefined && endAge !== undefined) {
        // 如果找到了相應卡片的 id，則更新；否則，添加
        if (state.ageRanges[cardId]) {
          state.ageRanges[cardId] = { startAge, endAge };
        } else {
          state.ageRanges[cardId] = { startAge, endAge };
        }
      }
    },
    deleteAge: (state, action) => {
      const cardId = action.payload;
      delete state.ageRanges[cardId];
    },
  },
});

export const { setAge, deleteCard } = ageSlice.actions;
export default ageSlice.reducer;
