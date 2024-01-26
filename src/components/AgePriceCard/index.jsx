import React from 'react';
import { CloseOutlined } from '@ant-design/icons';
import { Button } from 'antd';

import AgeGroupSelect from '../AgeGroupSelect';
import PriceInput from '../PriceInput';
import './index.css';

export default function AgePriceCard({
  numCards,
  onDelete,
  isVisible,
  cardId,
}) {
  //處理關閉卡片，將要刪除的cardId傳給ageGroupPriceList
  const handleCloseCard = () => {
    onDelete(cardId);
  };

  return (
    <div
      className="age-price-card"
      style={{ display: isVisible ? 'block' : 'none' }}
    >
      <div className="card-header">
        <div className="card-title">價格設定-{numCards}</div>
        {numCards > 1 && (
          <Button
            type="link"
            onClick={handleCloseCard}
            className="remove-button"
          >
            <CloseOutlined /> 移除
          </Button>
        )}
      </div>

      <div className="card-content">
        <AgeGroupSelect cardId={cardId} />
        <PriceInput cardId={cardId} />
      </div>
    </div>
  );
}
