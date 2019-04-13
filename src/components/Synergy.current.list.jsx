import React, { Component } from "react";
import { connect } from "react-redux";

class CurrentSynergyList extends Component {

  getActive(active, count) {
    const {synergies, type} = this.props;
    const synergy = synergies[active];
    const actives = [];
    Object.keys(synergy).map(key => {
      const threshhold = parseInt(key);
      if(isNaN(threshhold)) {
        return key;
      }
      if (type === 'active' && count >= threshhold && synergy.active) {
        actives.push(
          <div className="active-synergy" key={`${type}-${active}-${key}`}>
            {active} | {synergy[key]}
          </div>
        )
      }

      if (type === 'inactive' && count <= threshhold) {
        actives.push(
          <div className="missing-synergy" key={`${type}-${active}-${key}`}>
            {active} | Missing {threshhold - count}. {synergy[key]}
          </div>
        )
      }

      return key;
    });
    return actives;
  }

  getSynergies(actives) {
    let activeSynergies = [];
    Object.entries(actives).map(value => {
      const synergy = value[0];
      const count = value[1];
      const active = this.getActive(synergy, count);
      if(active.length) {
        activeSynergies = activeSynergies.concat(active);
      }
      return value;
    })
    return activeSynergies;
  }

  render() {
    const { type } = this.props;
    return (
      <div className={`${type}-synergy-container`}>
        {this.getSynergies(this.props.actives)}
      </div>
    )
  }
};

const getData = (state, store) => state[store];

const mapStateToProps = (state) => {
  return {
    heroes: getData(state, 'heroes').heroes,
    actives: getData(state, 'synergies').actives,
    synergies: getData(state, 'synergies').synergies,
    images: getData(state, 'images')
  };
};

const CurrentSynergyListConnected = connect(mapStateToProps, null)(CurrentSynergyList);
export default CurrentSynergyListConnected;
