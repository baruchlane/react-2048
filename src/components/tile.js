import React from 'react';
import './tile.scss';

const Tile = ({value}) => {
  return (
    <div className={`tile tile--${value}`}>
      <div className="tile__content">{!!value && value}</div>
    </div>
  )
};

export default Tile;