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

  splitToChunks(array, parts) {
    let result = [];
    for (let i = parts; i > 0; i--) {
      let newArray = array.splice(0, Math.ceil(array.length / i));
      if (1 % 2 !== 0) {
        newArray = newArray.reverse();
      }
      result.push(newArray);
    }
    console.log(result);
    return result;
  }
  generateSquares() {
    const squares = [];
    for (var i = 1; i <= 32; i++) {
      squares.unshift(
        <Square key={i} position={i} updatePosition={this.updatePosition.bind(this)}>
          {this.renderHero(i)}
        </Square>
      )
    };
    return this.splitToChunks(squares, 4);
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

  getHeroProps(heroProps, name) {
    const container = [];
    const props = Object.keys(heroProps[name]);
    props.map(prop => {
      if (prop === 'position') {
        return prop;
      }
      switch (heroProps[name][prop]) {
        case true:
          container.push(
            <div key={`${name}-${prop}`}>
              <span className={prop}>
                {prop}
              </span>
            </div>
          );
          break;
        default:
          container.push(
            <span key={`${name}-${prop}`}>
              {prop}: {heroProps[name][prop]}
            </span>
          );
          break;
      }
      return prop;
    });
    return container;
  }

  focusedHero(hero) {
    const container = [];
    const heroProps = Object.keys(hero);
    heroProps.map(name => {
      container.push(
        <div key={`focused-hero-${name}`} className="focus-container">
          <strong>
            {name}
          </strong>
          {this.getHeroProps(hero, name)}
        </div>
      );

      return name;
    })
    return container;
  }

  render() {
    return (
      <div className="chessboard-container">
        <div className="chessboard">
          {
            this.generateSquares()
          }
        </div>
        {
          this.props.focused ?
            this.focusedHero(this.props.focused)
            : null
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
    updateHero: (hero, position) => dispatch(heroStore.updateHero(hero, position))
  });
};
const ChessboardConnected = connect(mapStateToProps, mapDispatchToProps)(Chessboard);
export default ChessboardConnected;
