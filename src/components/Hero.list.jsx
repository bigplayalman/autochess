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
      <React.Fragment>
        {
          this.props.show ?
            <div className="hero-list-container">
              <div className="hero-list">
                {
                  Object.keys(heroes).map(hero => {
                    return (
                      <Hero key={`${hero}-list`}
                        name={hero}
                        hero={heroes[hero]}
                        selected={this.isHeroSelected(hero)}
                        image={this.getHeroImage(hero)}
                        selectHero={this.selectHero.bind(this)}
                      />
                    )
                  })
                }
              </div>
            </div>
            : null
        }
      </React.Fragment>

    );
  }
};

const getData = (state, store) => state[store];

const mapStateToProps = (state) => {
  return {
    heroes: getData(state, 'heroes').heroes,
    show: getData(state, 'heroes').show,
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
