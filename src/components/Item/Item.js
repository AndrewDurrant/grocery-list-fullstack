import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import GroceryContext from '../../GroceryContext';

export class Item extends Component {
  static contextType = GroceryContext;

  render() {
    let context = this.context;
    const { name, id } = this.props;

    return (
      <div className="itemCard">
        <h2 className="itemCardTitle">{name}</h2>
        <Link to='/'>
          <button
            className="deleteItemBtn"
            onClick={() => context.deleteItem(id)}>
            Delete
          </button>
        </Link>
      </div>
    )
  }
}

export default Item
