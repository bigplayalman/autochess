import React, { Component } from "react";
import { connect } from "react-redux";

export class FocusedHero extends Component {

  getHeroProps(heroProps, prop, key, hero) {
    switch (prop) {
      case 'position': return;
      case 'description':
        const image = this.props.images[`${hero.toLowerCase().split(' ').join('_')}_skill.png`];
        return (
          <div key={key} className={`${prop}-container`}>
            <img src={image} alt={hero} align="right" width="70" style={{padding: "5px"}}/>
            {heroProps[prop]}
          </div>
        )
      default: break;
    }
    switch (heroProps[prop]) {
      case true:
        return (
          <div key={key} className={`${prop}-container`}>
            <div className={prop}>
              {prop}
            </div>
          </div>
        )
      default:
        return (
          <div key={key} className={`${prop}-container`}>
            <strong>{prop}:&nbsp;</strong>
            <span>{heroProps[prop].toString()}</span>
          </div>
        )
    }
  }

  render() {

    if (!this.props.focused) {
      return <div className="focus-container">Select a Hero</div>
    }
    const hero = Object.keys(this.props.focused)[0];
    const heroProps = Object.keys(this.props.focused[hero]);
    return (
      <div className="focus-container">
        <strong>
          {hero}
        </strong>
        {
          heroProps.map(prop => {
            return this.getHeroProps(this.props.focused[hero], prop, `hero-prop-${prop}`, hero)
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
    focused: getData(state, 'heroes').focused,
    images: getData(state, 'images')
  };
};

const mapDispatchToProps = (dispatch) => {
  return ({
  });
};
const FocusedHeroConnected = connect(mapStateToProps, mapDispatchToProps)(FocusedHero);
export default FocusedHeroConnected;
