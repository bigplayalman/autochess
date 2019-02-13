import React, { Component } from 'react';
import './App.scss';
import { Hero } from './components/Heroes';
import { heroes } from './heroes';
import { synergies } from './synergies';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      heroes,
      synergies,
      activeSynergies: [],
      images: this.importAll(require.context('./assets', false, /\.(png|jpe?g|svg)$/)),
      selectedHeroes: []
    }
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
    const activeSynergies = this.getActiveSynergies(synergies);
    this.setState({ selectedHeroes, synergies, activeSynergies });
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
    this.setState({ selectedHeroes });
  }

  render() {
    console.log(this.state);
    return (
      <div className="app">
        <header>
          <h4>Dota AutoChess Companion</h4>
        </header>
        <main>
          <div className="selected-heroes">
            {
              this.state.selectedHeroes.map((hero) => {
                const props = {
                  ...hero,
                  images: this.state.images,
                  selectHero: this.removeHero.bind(this)
                };
                return <Hero key={hero.name + 'selected'} {...props} />;
              })
            }
          </div>
          <div className="effects">
            {this.state.activeSynergies.map((synergy, index) => {
              return (
                <div key={`${synergy.type}-${index}`}>
                  {synergy.effect}
                </div>
              );
            })}
          </div>
          <div className="all-heroes">
            {
              this.state.heroes.map((hero) => {
                const props = {
                  ...hero,
                  images: this.state.images,
                  selectHero: this.selectHero.bind(this),
                  selected: this.state.selectedHeroes.filter(x => x.name === hero.name).length,
                  disabled: this.state.selectedHeroes.length === 10
                };
                return <Hero key={hero.name + 'all'} {...props} />
              })
            }
          </div>
        </main>

        <footer>Dota 2 content and materials are trademarks and copyrights of Valve or its licensors.  This site is not affiliated with Valve. </footer>
      </div>
    );
  }
}

export default App;
