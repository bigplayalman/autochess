import React, { Component } from 'react';
import { Provider } from "react-redux";
import { configureStore } from './store';
import Layout from './Layout';
import { DragDropContext } from 'react-dnd';
import TouchBackend from 'react-dnd-touch-backend';
class App extends Component {

  constructor(props) {
    super(props);
    this.store = configureStore().store;
    this.history = configureStore().history;
  }
  render() {
    return (

        <Provider store={this.store}>
          <Layout />
        </Provider>

    );
  }
}

const touchOptions = {
  enableMouseEvents: true
};

export default DragDropContext(TouchBackend(touchOptions))(App);
