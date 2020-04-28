import React, { Component } from 'react';
import GroceryContext from '../../GroceryContext';
import Category from '../Category/Category';

export class CategoryList extends Component {
  static contextType = GroceryContext;

  render() {
    let context = this.context;

    const allCategories = context.categories.map(category => {
      return (
        <Category
          key={category.id}
          id={category.id}
          name={category.name}
          history={this.props.history}
        />
      )
    })

    return (
      <section>
        {allCategories}
      </section>
    )
  }
}

export default CategoryList
