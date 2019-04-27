import React, { Component } from "react";
import { connect } from "react-redux";
import SynergyItem from "./Synergy.item";

class AllSynergyList extends Component {
  getHeroes(synergy) {
    const heroes = []
    Object.keys(this.props.heroes).map(
      hero => {
        if (this.props.heroes[hero][synergy]) heroes.push(hero);
        return hero;
      });
    console.log(synergy, heroes);
    return heroes;
  }
  render() {
    const { synergies, images } = this.props;
    return (
      <div className="all-synergy-container">
        {Object.keys(synergies).map((synergy, index) => {
          return (
            <SynergyItem key={index} name={synergy} heroes={this.getHeroes(synergy)} effects={synergies[synergy]} images={images}/>
          )
        })}
      </div>
    )
  }
};

const getData = (state, store) => state[store];

const mapStateToProps = (state) => {
  return {
    heroes: getData(state, 'heroes').heroes,
    synergies: getData(state, 'synergies').synergies,
    images: getData(state, 'images')
  };
};

const AllSynergyListConnected = connect(mapStateToProps, null)(AllSynergyList);
export default AllSynergyListConnected;
