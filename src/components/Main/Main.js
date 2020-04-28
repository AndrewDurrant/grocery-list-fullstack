import React from 'react';
import ItemList from '../ItemList/ItemList';

function Main(props) {
  return (
    <div>
      <ItemList {...props} />
    </div>
  );
}

export default Main;