import React, { Component } from "react";
import { connect } from "react-redux";
import {actionCreators as synergyStore} from "../store/services/synergy.service";

class SynergyList extends Component {
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

  getActives = (actives) => {
    const activeSynergies = [];
    Object.keys(actives).map(active => {
      if (actives[active] && this.props.synergies[active].active) {
        activeSynergies.push(
          <div className="synergy-item" key={`${active}-perks`} onClick={() => this.props.setActiveSynergy(active, actives[active])}>
            <div className="synergy-item-count" style={{ backgroundImage: `url(${this.props.images[active + '.png']})` }}>
              <div>
                {actives[active]}
              </div>
            </div>
          </div>
        );
      }
      return active;
    });
    return activeSynergies;
  }
  render() {
    return (
      <div className="synergy-container">
        <div className="synergy-list">
          {this.getActives(this.props.actives)}
        </div>
        {
          this.props.active ?
            <div className="synergy-active">
              {this.displaySynergies(this.props.active, this.props.count)}
            </div>
            : null
        }
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
    active: getData(state, 'synergies').active,
    count: getData(state, 'synergies').count,
    images: getData(state, 'images')
  };
};
//setActiveSynergy
const mapDispatchToProps = (dispatch) => {
  return ({
    setActiveSynergy: (active, count) => dispatch(synergyStore.setActiveSynergy(active, count))
  });
};

const SynergyListConnected = connect(mapStateToProps, mapDispatchToProps)(SynergyList);
export default SynergyListConnected;
