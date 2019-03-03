import React, { Component } from "react";
import { connect } from "react-redux";
import { Hero } from "./Hero";
import { actionCreators as heroStore } from "../store/services/hero.service";

export class HeroList extends Component {
  getHeroImage(hero) {
    const image = this.props.images[`${hero.toLowerCase().split(' ').join('_')}_full.png`];
    return image;
  }

  selectHero(hero) {
    this.props.selectHero(hero);

  }
  isHeroSelected(hero) {
    return this.props.heroes[hero].position !== null;
  }

  getSelectedHeroes() {
    const selected = [];
    Object.keys(this.props.heroes).map(hero => {
      if (this.props.heroes[hero].position) {
        selected.push(hero)
      }
      return hero;
    });
    return selected;
  }

  isHeroDisabled(hero) {
    if (!this.isHeroSelected(hero)) {
      return this.getSelectedHeroes().length === 10;
    }
  }
  render() {
    const { heroes } = this.props;
    return (
      <div className="hero-list">
        {
          Object.keys(heroes).map(hero => {
            return (
              <Hero key={`${hero}-list`}
                name={hero}
                selected={this.isHeroSelected(hero)}
                disabled={this.isHeroDisabled(hero)}
                image={this.getHeroImage(hero)}
                selectHero={this.selectHero.bind(this)}
              />
            )
          })
        }
      </div>
    );
  }
};

const getData = (state, store) => state[store];

const mapStateToProps = (state) => {
  return {
    heroes: getData(state, 'heroes'),
    synergies: getData(state, 'synergies'),
    images: getData(state, 'images')
  };
};

const mapDispatchToProps = (dispatch) => {
  return ({
    selectHero: (hero) => dispatch(heroStore.selectHero(hero))
  });
};
const HeroListConnected = connect(mapStateToProps, mapDispatchToProps)(HeroList);
export default HeroListConnected;
