import React, { Component } from 'react';
import './App.scss';
import { Hero } from './components/Heroes';
import { heroes } from './heroes';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      heroes,
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
    if (this.state.selectedHeroes.length >= 10) {
      if (filteredHeroes.length) {
        const selectedHeroes = this.state.selectedHeroes.filter(x => x.name !== hero.name);
        this.setState({ selectedHeroes });
      }
      return;
    }
    if (!filteredHeroes.length) {
      const selectedHeroes = this.state.selectedHeroes.concat([hero]);
      this.setState({ selectedHeroes });
    } else {
      const selectedHeroes = this.state.selectedHeroes.filter(x => x.name !== hero.name);
      this.setState({ selectedHeroes });
    }
  }

  removeHero(e, hero) {
    e.preventDefault();
    const selectedHeroes = this.state.selectedHeroes.filter(x => x.name !== hero.name);
    this.setState({ selectedHeroes });
  }

  render() {
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
