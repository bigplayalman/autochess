import React, { Component } from 'react';
import { Provider } from "react-redux";
import { configureStore } from './store';
import Layout from './Layout';

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

export default App;
