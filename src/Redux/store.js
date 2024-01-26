import { configureStore } from '@reduxjs/toolkit';

import rootReducer from './combineReducers';

export default configureStore({
  reducer: rootReducer,
});
