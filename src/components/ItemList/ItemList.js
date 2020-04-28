import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import GroceryContext from '../../GroceryContext';

import Item from '../Item/Item';
export class ItemList extends Component {
  static contextType = GroceryContext;
  render() {
    let context = this.context;
    let filteredItems;

    if (this.props.match.params.categoryId) {
      filteredItems = context.items.filter(item => item.categoryId === this.props.match.params.categoryId)
    } else {
      filteredItems = context.items;
    }

    const allItems = filteredItems.map(item => {
      return(
        <Item
          key={item.id}
          id={item.id}
          name={item.name}
          categoryId={item.categoryId}
          history={this.props.history}
        />
      )
    })

    return (
      <main className="items">
        <div className="itemCardContainer">
          { allItems }
          <Link to='/addItem'>
            <button className="addItemBtn">
              Add Item
            </button>
          </Link>
        </div>
      </main>
    )
  }
}

export default ItemList
