import React, { Component } from "react";
import { connect } from "react-redux";

class SynergyList extends Component {
  displaySynergies = (synergy, count) => {
    const activeSynergies = [];
    const { synergies } = this.props.synergies;
    Object.keys(synergies[synergy]).map(key => {
      if (key !== 'active' && synergies[synergy].active) {
        const threshhold = parseInt(key);
        if (count >= threshhold) {
          activeSynergies.push(
            <div className="active-synergy" key={`${synergy}-${key}`}>
              {synergies[synergy][key]}
            </div>
          )
        } else {
          activeSynergies.push(
            <div className="missing-synergy" key={`${synergy}-${key}`}>
              Missing {threshhold - count}.  {synergies[synergy][key]}
            </div>
          )
        }
      }
      return key;
    });
    return activeSynergies;
  }

  getActives = (actives) => {
    const activeSynergies = [];
    Object.keys(actives).map(active => {
      if (actives[active] && this.props.synergies.synergies[active].active) {
        activeSynergies.push(
          <div className="synergy-item" key={`${active}-perks`}>
            <div className="synergy-item-count">
              <div>
                {actives[active]}
              </div>
            </div>
            {/* <div className="synergy-item-body">
              {this.displaySynergies(active, actives[active])}
            </div> */}
          </div>
        );
      }
      return active;
    });
    return activeSynergies;
  }
  render() {
    return (
      <div className="synergy-list">
        {this.getActives(this.props.synergies.actives)}
      </div>
    )
  }
};

const getData = (state, store) => state[store];

const mapStateToProps = (state) => {
  return {
    heroes: getData(state, 'heroes').heroes,
    synergies: getData(state, 'synergies')
  };
};

const SynergyListConnected = connect(mapStateToProps, null)(SynergyList);
export default SynergyListConnected;
