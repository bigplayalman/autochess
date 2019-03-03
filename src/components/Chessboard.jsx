import React, { Component } from "react";
import { connect } from "react-redux";
import { Hero } from "./Hero";

class Chessboard extends Component {
  getHeroImage(hero) {
    const image = this.props.images[`${hero.toLowerCase().split(' ').join('_')}_full.png`];
    return image;
  }
  generateSquares() {
    const squares = [];
    for (var i = 1; i <= 32; i++) {
      const hero = this.getHero(i);
      if (hero) {
        squares.push(
          <Hero key={`${hero}-board`}
            name={hero}
            selected={false}
            disabled={false}
            image={this.getHeroImage(hero)}
            selectHero={() => { }}
          />
        )
      } else {
        squares.push(<div key={i}>{i}</div>)
      }

    }
    return squares;
  }

  getHero(position) {
    let exists = null;
    Object.keys(this.props.heroes).map(hero => {
      if (this.props.heroes[hero].position === position) {
        exists = hero
      }
      return hero;
    });
    return exists;
  }

  render() {
    return (
      <div className="chessboard">
        {
          this.generateSquares()
        }
      </div>
    )
  }
};

const getData = (state, store) => state[store];

const mapStateToProps = (state) => {
  return {
    heroes: getData(state, 'heroes'),
    images: getData(state, 'images')
  };
};

const mapDispatchToProps = (dispatch) => {
  return ({
    // selectHero: (hero) => dispatch(heroStore.selectHero(hero))
  });
};
const ChessboardConnected = connect(mapStateToProps, mapDispatchToProps)(Chessboard);
export default ChessboardConnected;
