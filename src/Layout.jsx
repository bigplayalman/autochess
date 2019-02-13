import React, { Component } from "react";
import "./Layout.scss";

class App extends Component {
  render() {
    return (
      <div className="container">
        <div className="header">header</div>
        <div className="selected-heroes">selected-heroes</div>
        <div className="active-list">active-list</div>
        <div className="active-synergies">active-synergies</div>
        <div className="all-synergies">all-synergies</div>
        <div className="all-heroes">all-heroes</div>
        <div className="footer">footer</div>
      </div>
    );
  }
}

export default App;
