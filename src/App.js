import React, { Component } from 'react';
import './App.scss';
import { Hero } from './components/Heroes';
import { heroes } from './heroes';

class App extends Component {
  
  importAll(r) {
    let images = {};
    r.keys().forEach((item) => { images[item.replace('./', '')] = r(item); });
    return images;
  }
  

  render() {
    const images = this.importAll(require.context('./assets', false, /\.(png|jpe?g|svg)$/));
    return (
      <div className="app">
        {
          heroes.map((hero) => {
            return <Hero key={hero.name} {...hero} images={images}/>
          })
        }

      </div>
    );
  }
}

export default App;
