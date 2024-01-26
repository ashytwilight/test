import React, { useState } from 'react';
import { Select } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import { setAge } from '../../Redux/actions';
import './index.css';

const { Option } = Select;

export default function AgeGroupSelect({ cardId }) {
  const [startAge, setStartAge] = useState(null);
  const [endAge, setEndAge] = useState(null);
  const dispatch = useDispatch();
  const allCards = useSelector(state => state.agedata.ageRanges);

  //檢查是否和其他卡片的年齡區間重疊
  const checkOverlap = (currentCardId, newStartAge, newEndAge) => {
    if (newStartAge === null && newEndAge === null) {
      return false;
    }
    for (const id in allCards) {
      if (id !== currentCardId) {
        const { startAge, endAge } = allCards[id];
        if (newStartAge <= endAge && newEndAge >= startAge) {
          return true; // 有重疊
        }
      }
    }
    return false; // 沒有重疊
  };

  //處理開始年齡改變
  const handleStartAgeChange = value => {
    setStartAge(value);
    dispatch(setAge({ cardId, startAge: value, endAge }));
  };

  //處理結束年齡改變
  const handleEndAgeChange = value => {
    setEndAge(value);
    dispatch(setAge({ cardId, startAge, endAge: value }));
  };

  //生成開始年齡選項並過濾掉不該有的選項
  const generateStartAgeOptions = () => {
    const options = [];
    for (let i = 0; i <= 20; i++) {
      options.push(
        <Option key={i} value={i} disabled={startAge !== null && i > endAge}>
          {i}
        </Option>
      );
    }

    return options;
  };

  //生成結束年齡選項並過濾掉不該有的選項
  const generateEndAgeOptions = () => {
    const options = [];
    for (let i = 0; i <= 20; i++) {
      options.push(
        <Option key={i} value={i} disabled={i < startAge}>
          {i}
        </Option>
      );
    }

    return options;
  };

  return (
    <div className="age-group-select-container">
      <div className="age-group-label">年齡</div>
      <div className="age-select-container">
        <Select
          value={startAge}
          onChange={handleStartAgeChange}
          className="start-age-select"
        >
          {generateStartAgeOptions()}
        </Select>
        <div className="range-divider">~</div>
        <Select
          value={endAge}
          onChange={handleEndAgeChange}
          className="end-age-select"
        >
          {generateEndAgeOptions()}
        </Select>
      </div>
      {checkOverlap(cardId, startAge, endAge) && (
        <div className="overlap-warning">年齡區間不可重疊</div>
      )}
    </div>
  );
}
