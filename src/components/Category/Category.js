import React, { Component } from 'react'

export class Category extends Component {
  render() {

    return (
      <div
        className="categoryCard"
        onClick={() => {
          this.props.history.push('/category/'+this.props.id)
        }}
      >
        <h2 className="categoryTitle">{this.props.name}</h2>
      </div>
    )
  }
}

export default Category
