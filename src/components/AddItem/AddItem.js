import React, { Component } from 'react';
import cuid from 'cuid';
import GroceryContext from '../../GroceryContext';
import { Link } from 'react-router-dom';
import ValidationError from '../../ValidationError';

export class AddItem extends Component {
  static contextType = GroceryContext;

  constructor(props) {
    super(props);
    this.state = {
      itemName: {
        value: '',
        touched: false
      },
      categoryId: {
        value: '',
        touched: false
      }
    }
  }

  handleChange(category) {
    this.setState({
      categoryId: {
        value: category,
        touched: true
      }
    })
  }

  updateItemName(name) {
    this.setState({
      itemName: {
        value: name,
        touched: true
      }
    })
  }

  handleSubmit(event) {
    event.preventDefault();
    const { itemName, categoryId } = this.state;
    const item = {
      id: cuid(),
      categoryId: categoryId.value,
      name: itemName.value,
    }
    this.context.addItem(item)
      .then(() => {
        this.context.updateItems(item)
        this.props.history.push('/')
      })
  }

  validateItemName() {
    const itemName = this.state.itemName.value.trim();
    if(itemName.length === 0) {
      return 'Item name is required';
    } else if(itemName.length < 3) {
      return 'Item name must be at least 3 characters long'
    }
  }

  render() {
    const itemNameError = this.validateItemName();

    return (
      <form className="addItem" onSubmit={e => this.handleSubmit(e)}>
        <h2>Add Item</h2>
        <div>* required field</div>
        <div>
          <label htmlFor="itemName">Item Name *</label>
          <input 
            type="text"
            name="itemName"
            id="itemName"
            onChange={e => this.updateItemName(e.target.value)}
          />
          {this.state.itemName.touched && (
            <ValidationError message={itemNameError} />
          )}
        </div>
        <div>
          <label htmlFor="categoryId">Category Association</label>
          <select 
            name="categoryId"
            id="categoryId"
            value={this.state.value}
            onChange={e => this.handleChange(e.target.value)}
            >
              {this.context.categories.map(category => 
                <option value={category.id} key={category.id}>{category.name}</option>
              )}
            </select>
        </div>
        
        <div className="addItem__button__group">
          <Link to='/'>
            <button type="reset">
              Cancel
            </button>
          </Link>
          <button
            type="submit"
            disabled= {
              this.validateItemName() 
            }
          >
            Save
          </button>
        </div>

      </form>
    )
  }
}

export default AddItem
