import React, { Component } from "react";
import { heroes } from './heroes';
import { synergies } from './synergies';
import "./Layout.scss";
import Header from "./components/Header";
import HeroList from "./components/Hero.list";
import SynergyList from "./components/Synergy.list";
import FilterList from "./components/Filter.list";
import TypeList from "./components/Type.list";

class Layout extends Component {
  constructor(props) {
    super(props)
    this.state = {
      heroes,
      synergies: {},
      activeSynergies: [],
      images: this.importAll(require.context('./assets', false, /\.(png|jpe?g|svg)$/)),
      filters: this.generateFilters(),
      selectedHeroes: []
    }
  }

  generateFilters() {
    const filters = {};
    synergies.map(synergy => {
      filters[synergy.type] = false;
      return synergy;
    });
    return filters;
  }

  setFilter(filter) {
    this.setState(oldState => {
      return {
        ...oldState,
        filters: {
          ...oldState.filters,
          [filter]: !oldState.filters[filter]
        }
      }
    })
  }

  importAll(r) {
    let images = {};
    r.keys().forEach((item) => { images[item.replace('./', '')] = r(item); });
    return images;
  }

  selectHero(e, hero) {
    e.preventDefault();
    const filteredHeroes = this.state.selectedHeroes.filter(x => x.name === hero.name);
    let selectedHeroes = this.state.selectedHeroes;
    switch (selectedHeroes.length) {
      case 11: break;
      case 10:
        if (filteredHeroes.length) {
          selectedHeroes = this.state.selectedHeroes.filter(x => x.name !== hero.name);
        }
        break;
      default:
        if (filteredHeroes.length) {
          selectedHeroes = this.state.selectedHeroes.filter(x => x.name !== hero.name);
        } else {
          selectedHeroes = this.state.selectedHeroes.concat([hero]);
        }
    }
    const synergies = this.generateSynergies(selectedHeroes);
    const actives = this.getActiveSynergies(synergies);
    const activeSynergies = this.conditionalSynergies(actives, selectedHeroes);
    this.setState((oldState) => {
      return {
        ...oldState,
        selectedHeroes,
        synergies,
        activeSynergies
      }
    });
  }

  conditionalSynergies(synergies, heroes) {
    console.log(synergies);
    const demonhunters = synergies.filter(x => x.type === 'demonhunter');
    const demons = heroes.filter(y => y.demon === true);
    if (demonhunters.length < 2 && demons.length > 1) {
      return synergies.filter(y => y.type !== 'demon');
    }
    return synergies;
  }

  getActiveSynergies(actives) {
    const activeSynergies = [];
    synergies.map(synergy => {
      if (actives[synergy.type] && actives[synergy.type] >= synergy.count) {
        activeSynergies.push(synergy);
      }
      return synergy;
    })
    return activeSynergies;
  }

  generateSynergies(heroes) {
    const synergies = {};
    heroes.map(hero => {
      Object.keys(hero).map(prop => {
        if (hero[prop] === true) {
          if (synergies[prop]) {
            synergies[prop]++;
          } else {
            synergies[prop] = 1;
          }
        }
        return prop;
      });
      return hero;
    });
    return synergies;
  }

  removeHero(e, hero) {
    e.preventDefault();
    const selectedHeroes = this.state.selectedHeroes.filter(x => x.name !== hero.name);
    const synergies = this.generateSynergies(selectedHeroes);
    const activeSynergies = this.getActiveSynergies(synergies);
    this.setState((oldState) => {
      return {
        ...oldState,
        selectedHeroes,
        synergies,
        activeSynergies
      }
    });
  }
  render() {
    const selectedHeroes = {
      heroes: this.state.selectedHeroes,
      selectHero: this.removeHero.bind(this),
      images: this.state.images,
      className: 'selected-heroes',
      selectedHeroes: [],
      disabled: false
    }
    const allHeroes = {
      heroes: this.state.heroes,
      selectHero: this.selectHero.bind(this),
      images: this.state.images,
      className: 'all-heroes',
      selectedHeroes: this.state.selectedHeroes,
      disabled: this.state.selectedHeroes.length === 10,
      filters: this.state.filters
    }

    const activeSynergies = {
      title: 'Active Synergies',
      synergies: this.state.activeSynergies,
      className: 'active-synergies',
      activeSynergies: []
    }
    const allSynergies = {
      title: 'All Synergies',
      synergies,
      className: 'all-synergies',
      activeSynergies: this.state.activeSynergies
    }
    const types = {
      title: 'Classes and Races',
      className: 'active-list',
      types: this.state.synergies
    }
    const filters = {
      title: 'Active Filters',
      className: 'active-filters',
      filters: this.state.filters,
      setFilter: this.setFilter.bind(this)
    }
    return (

      <div className="container">
        <Header />
        <div className="main">
          <HeroList {...selectedHeroes} />
          <TypeList {...types} />
          <SynergyList {...activeSynergies} />
          <SynergyList {...allSynergies} />
        </div>
        <div className="side">
          <FilterList {...filters} />
          <HeroList {...allHeroes} />
        </div>
        <div className="footer">
          Dota 2 content and materials are trademarks and copyrights of Valve or its licensors.  This site is not affiliated with Valve.
        </div>
      </div>
    );
  }
}

export default Layout;
