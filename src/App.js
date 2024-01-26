import React from 'react';
import { useSelector } from 'react-redux';

import AgeGroupPriceList from './components/AgeGroupPriceList';

export default function App() {
  const allAges = useSelector(state => state.agedata.ageRanges);
  const allPrices = useSelector(state => state.pricedata.price);
  const result = [];

  // console出結果
  for (const cardId in allAges) {
    const { startAge, endAge } = allAges[cardId];

    const price = allPrices[cardId];
    if (
      startAge != null &&
      startAge + 1 &&
      endAge != null &&
      endAge + 1 &&
      price
    ) {
      result.push({
        ageGroup: [startAge, endAge],
        price: price,
      });
    }
  }
  if (result.length > 0) {
    console.log('result=', JSON.stringify(result));
  }

  return (
    <div>
      <AgeGroupPriceList />
    </div>
  );
}
