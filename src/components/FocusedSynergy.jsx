import React, { Component } from "react";
import { connect } from "react-redux";

class FocusedSynergy extends Component {
  displaySynergies = (synergy, count) => {
    const activeSynergies = [];
    const { synergies } = this.props;
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
  render() {
    if (!this.props.active) {
      return <div className="synergy-active" style={{color: 'white'}}>Select a Synergy</div>
    }
    return (
      <div className="synergy-active">
        {this.displaySynergies(this.props.active, this.props.count)}
      </div>
    )
  }
};

const getData = (state, store) => state[store];

const mapStateToProps = (state) => {
  return {
    synergies: getData(state, 'synergies').synergies,
    active: getData(state, 'synergies').active,
    count: getData(state, 'synergies').count
  };
};

const mapDispatchToProps = (dispatch) => {
  return ({
  });
};

const FocusedSynergyConnected = connect(mapStateToProps, mapDispatchToProps)(FocusedSynergy);
export default FocusedSynergyConnected;
