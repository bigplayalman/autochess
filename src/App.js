import React, { Component } from 'react';
import './App.scss';
import { Hero } from './components/Heroes';
import {Heroes} from './heroes';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Hero />
      </div>
    );
  }
}

export default App;
