import { combineReducers } from '@reduxjs/toolkit';
import setAgeReducer from './ageReducer';
import setPriceReducer from './priceReducer';

const rootReducer = combineReducers({
  agedata: setAgeReducer,
  pricedata: setPriceReducer,
});

export default rootReducer;
