import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import cuid from 'cuid';

import GroceryContext from './GroceryContext';
import Sidebar from './components/Sidebar/Sidebar';
import Main from './components/Main/Main.js';
import AddItem from './components/AddItem/AddItem';
export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [
        {
          id: cuid(),
          name: 'all'
        },
        {
          id: cuid(),
          name: 'bakery'
        }, 
        {
          id: cuid(),
          name: 'bulk'
        },
        {
          id: cuid(),
          name: 'canned goods'
        },
        {
          id: cuid(),
          name: 'dairy'
        },
        {
          id: cuid(),
          name: 'frozen foods'
        },
        {
          id: cuid(),
          name: 'meat'
        },
        {
          id: cuid(),
          name: 'miscellaneous'
        },
        {
          id: cuid(),
          name: 'produce'
        }
      ],
      items: [],
      error: null
    }
  }

  componentDidMount() {
    fetch('http://localhost:8000/item')
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

  updateItems = (item) => {
    this.setState({
      items: [...this.state.items, item]
    })
  }

  render() {
    const contextValue = {
      categories: this.state.categories,
      items: this.state.items,
      error: this.state.error,
      addItem: this.handleAddItem,
      deleteItem: this.handleDelete,
      updateItems: this.updateItems
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
              render={props => (
                <>
                  <Sidebar {...props}/>
                  <Main {...props}/>
                </>
              )}
            />
            <Route
              exact
              path="/category/:categoryId"
              render={props => (
                <>
                  <Sidebar {...props}/>
                  <Main {...props}/>
                </>
              )}
            />
            <Route
              exact
              path="/addItem"
              render={props => (
                <AddItem {...props}/>
              )}
            />
          </main>
        </>
      </GroceryContext.Provider>
    );
  }

  
}

export default App;
