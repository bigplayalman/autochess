import React, { Component } from "react";
import { connect } from "react-redux";
import DragContainer from "./DragContainer";
import { actionCreators as heroStore } from "../store/services/hero.service";
import Square from "./Square";

class Chessboard extends Component {
  getHeroImage(hero) {
    const image = this.props.images[`${hero.toLowerCase().split(' ').join('_')}_full.png`];
    return image;
  }
  renderHero(position) {
    const hero = this.getHero(position);
    if (hero) {
      return <DragContainer name={hero} image={this.getHeroImage(hero)} />
    }
  }
  updatePosition(hero, position) {
    this.props.updateHero(hero, position);
  }
  generateSquares() {
    const squares = [];
    for (var i = 1; i <= 32; i++) {
      squares.push(
        <Square key={i} position={i} updatePosition={this.updatePosition.bind(this)}>
          {this.renderHero(i)}
        </Square>
      )
    };
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
    updateHero: (hero, position) => dispatch(heroStore.updateHero(hero, position))
  });
};
const ChessboardConnected = connect(mapStateToProps, mapDispatchToProps)(Chessboard);
export default ChessboardConnected;
