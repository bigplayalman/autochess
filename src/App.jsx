import React, { Component } from 'react';
import { Provider } from "react-redux";
import { DragDropContext } from 'react-dnd';
import TouchBackend from 'react-dnd-touch-backend';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { configureStore } from './store';
import classnames from 'classnames';
import "./styles/structure.scss";

import Header from './components/Header';
import ChessboardView from './views/Chessboard.view';
import Footer from './components/Footer';
import SynergyListView from './views/Synergy.list.view';
import Sidebar from './components/Sidebar';
import HeroList from './components/Hero.list';
import NeutralsList from './components/Neutrals.list';

class App extends Component {

  constructor(props) {
    super(props);
    this.store = configureStore().store;
    this.history = configureStore().history;
    this.state = {
      left: false,
      right: false
    }
  }

  toggleSidebar(side, value) {
    this.setState({ [side]: value });
  }

  render() {
    const sidebarRight = classnames({
      'sidebar-right': true,
      'show': this.state.right
    })
    return (
      <Provider store={this.store}>
        <Router>
          <div className="container">
            <Header
              left={this.state.left}
              right={this.state.right}
              toggleSidebar={this.toggleSidebar.bind(this)} />
            <Sidebar show={this.state.left} />
            <main>
              <Route path="/" exact component={ChessboardView} />
              <Route path="/list/" component={SynergyListView} />
            </main>
            <aside className={sidebarRight}>
              <Route path="/" exact component={HeroList}/>
              <Route path="/list/" component={NeutralsList} />
            </aside>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

const touchOptions = {
  enableMouseEvents: true
};

export default DragDropContext(TouchBackend(touchOptions))(App);
