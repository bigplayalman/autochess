import React, { Component } from "react";
import { connect } from "react-redux";

export class FocusedHero extends Component {

  getHeroProps(heroProps, prop, key) {
    console.log(heroProps);
    if (prop === 'position') {
      return;
    }
    switch (heroProps[prop]) {
      case true:
        return (
          <div key={key}>
            <div className={prop}>
              {prop}
            </div>
          </div>
        )
      default:
        return (
          <div key={key}>
            <strong>{prop}:</strong>
            <span>{heroProps[prop]}</span>
          </div>
        )
    }
  }

  render() {

    if (!this.props.focused) {
      return null;
    }
    const hero = Object.keys(this.props.focused)[0];
    const heroProps = Object.keys(this.props.focused[hero]);
    console.log(heroProps);
    return (
      <div className="focus-container">
        <strong>
          {hero}
        </strong>
        {
          heroProps.map(prop => {
            return this.getHeroProps(this.props.focused[hero], prop, `hero-prop-${prop}`)
          })
        }
      </div>
    )
  }
};

const getData = (state, store) => state[store];

const mapStateToProps = (state) => {
  return {
    heroes: getData(state, 'heroes').heroes,
    focused: getData(state, 'heroes').focused
  };
};

const mapDispatchToProps = (dispatch) => {
  return ({
  });
};
const FocusedHeroConnected = connect(mapStateToProps, mapDispatchToProps)(FocusedHero);
export default FocusedHeroConnected;
