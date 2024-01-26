import React, { useState } from 'react';
import { Input } from 'antd';
import { useDispatch } from 'react-redux';

import { setPrice } from '../../Redux/actions';
import './index.css';

export default function PriceInput(cardId) {
  const [inputValue, setInputValue] = useState('');
  const dispatch = useDispatch();

  //處理輸入價格後
  const enterPrice = e => {
    var value = e.target.value;

    if (value === '0' || value === '00') {
      //處理都輸入為0
      setInputValue('0');
      dispatch(setPrice({ cardId, price: '0' }));
    } else {
      var formattedValue = value
        .replace(/^0+|[^0-9.]/g, '') // 去掉不該有的符號和開頭為0
        .replace(/^(\d*\.\d*?)\.$/, '$1') // 保留一個小數點
        .replace(/^(\.\d+)/, '0$1'); // 如果第一個字是.，在前面加上0

      formattedValue = addComma(formattedValue);

      setInputValue(formattedValue);
      dispatch(setPrice({ cardId, price: formattedValue }));
    }
  };

  //給input加千分位逗號
  const addComma = num => {
    const numberWithNoComma = num.toString().replace(/,/g, '');
    return numberWithNoComma.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');
  };

  return (
    <div className="price-input-container">
      <div className="label">入住費用(每人每晚)</div>
      <Input
        addonBefore="TWD"
        placeholder="請輸入費用"
        className="input-field"
        onChange={enterPrice}
        value={inputValue}
      />
      {inputValue.trim() === '' && (
        <div className="error-message">不可以為空白</div>
      )}
      <div className="additional-message">輸入0表示免費</div>
    </div>
  );
}
