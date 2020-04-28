import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';

import GroceryContext from './GroceryContext';
import Sidebar from './Sidebar/Sidebar';
import Main from './Main/Main';
export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: ['beverages', 'bakery', 'bulk', 'canned goods', 'dairy', 'frozen foods', 'produce', 'meat', 'health', 'miscellaneous'],
      items: [],
      error: null
    }
  }

  componentDidMount() {
    fetch('http://localhost:8000/items')
      .then(response => response.json())
      .then(data => {
        this.setState({
          "items": data
        })
      })
      .catch(err => {
        this.setState({
          error: err
        })
      })
  }

  handleAddItem = (item) => {
    return fetch('http://localhost:8000/items', 
      {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
      }
    )
    .then((response) => response.json())
    .then((data) => {
      console.log('Success:', data);
    })
    .catch(err => {
      this.setState({
        error: err
      })
    })
  }

  handleDelete = (itemId) => {
    fetch(`http://localhost:8000/items/${itemId}`, {
      method: 'DELETE', 
      headers: {
        'content-type': 'application/json'
      }
    })
    this.setState({
      items: this.state.items.filter(item => item.id !== itemId)
    })
  }

  handleCategoryClicked = (categoryId) => {

  }

  render() {
    const contextValue = {
      categories: this.state.categories,
      items: this.state.items,
      error: this.state.error,
      addItem: this.handleAddItem,
      deleteNote: this.handleDelete,
    }

    return (
      <GroceryContext.Provider value={contextValue}>
        <>
          <header>
            <Link
              className="homeLink"
              to='/'
            >
              <h1 className="appName">
                Grocery List
              </h1>
            </Link>
          </header>
          <main className="main-container">
            <Route
              exact
              path="/"
              render={props =>
                <>
                  <Sidebar {...props}/>
                  <Main {...props}/>
                </>
              }
            />

            <Route />
          </main>
        </>
      </GroceryContext.Provider>
    );
  }

  
}

export default App;
