import React, { Component } from "react";
import {connect} from "react-redux";
import { actionCreators as heroStore } from "../store/services/hero.service";

export class Header extends Component {
  render() {
    return (
      <header>
        <strong>
          Dota Auto Chess Synergy
        </strong>
        <label>
          <input type='checkbox' value={this.props.heroes.show} onChange={({ target: { checked } }) => { this.props.toggleHero(checked) }} />
          <span className='menu'>
            Heroes
            <span className='hamburger' />
          </span>
        </label>
      </header>
    );
  }
};

const getData = (state, store) => state[store];

const mapStateToProps = (state) => {
  return {
    heroes: getData(state, 'heroes')
  };
};

const mapDispatchToProps = (dispatch) => {
  return ({
    toggleHero: (hero) => dispatch(heroStore.toggleHero(hero))
  });
};
const HeaderConnected = connect(mapStateToProps, mapDispatchToProps)(Header);
export default HeaderConnected;
