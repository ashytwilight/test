import React, { useState } from 'react';
import { Divider, Button } from 'antd';
import { v4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';

import { deleteAge, deletePrice } from '../../Redux/actions';
import AgePriceCard from '../AgePriceCard';
import './index.css';

export default function AgeGroupPriceList() {
  const dispatch = useDispatch();
  const [numCards, setNumCards] = useState(1);
  const [visibleCards, setVisibleCards] = useState([{ cardId: v4() }]);

  const allAges = useSelector(state => state.agedata.ageRanges);

  //新增ageprice卡片
  const handleAddCard = () => {
    setNumCards(num => num + 1);
    setVisibleCards(cards => [...cards, { cardId: v4() }]);
  };

  //刪除ageprice卡片
  const handleDeleteCard = cardId => {
    dispatch(deleteAge(cardId));
    dispatch(deletePrice(cardId));
    setNumCards(num => num - 1);
    setVisibleCards(cards => cards.filter(card => card.cardId !== cardId));
  };

  //查看年齡區間是否涵蓋0-20
  const checkAgeIsFull = () => {
    const ageRanges = Object.values(allAges);
    var dict = {};

    ageRanges.forEach(arr => {
      var a = arr.startAge,
        b = arr.endAge;
      for (let i = a; i <= b; i++) {
        if (!dict[i]) {
          dict[i] = 1;
        } else {
          dict[i] += 1;
        }
      }
    });
    return Object.keys(dict).length === 21;
  };

  return (
    <div className="age-group-price-list-container">
      {visibleCards.map(({ cardId }, index) => (
        <div key={cardId}>
          <AgePriceCard
            numCards={index + 1}
            cardId={cardId}
            onDelete={() => handleDeleteCard(cardId)}
            isVisible={true}
          />
          {index < numCards - 1 && <Divider />}
        </div>
      ))}
      <Button
        type="link"
        onClick={handleAddCard}
        disabled={checkAgeIsFull()}
        className="add-card-button"
      >
        +新增價格設定
      </Button>
    </div>
  );
}
