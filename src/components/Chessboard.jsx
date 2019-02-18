import React, { Component } from "react";
import Square from "./Square";
import difference from "lodash.difference";

class Chessboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      heroes: props.heroes,
      squares: {
        ...this.generateChessboard()
      },
      selectedHero: null,
      previousSquare: null,
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const positionHeroes = (heroes, squares) => {
      let heroIndex = 0;
      const maxHero = heroes.length;
      Object.keys(squares).map(square => {
        if (squares[square].hero === null) {
          if (heroIndex < maxHero) {
            squares[square].hero = heroes[heroIndex];
            heroIndex++;
          }
        }
        return square;
      });
      return squares;
    }
    const heroes = difference(nextProps.heroes, prevState.heroes);
    if (heroes.length) {
      const squares = positionHeroes(heroes, prevState.squares);
      return {
        ...prevState,
        heroes: nextProps.heroes,
        squares
      }
    }
    return prevState;
  }

  generateChessboard() {
    const squares = {}
    const darkClass = 'dark-green-square';
    const lightClass = 'light-green-square';
    for (var row = 1; row <= 4; row++) {
      let dark, light = '';
      if (row % 2 === 0) {
        dark = lightClass;
        light = darkClass;
      } else {
        dark = darkClass;
        light = lightClass
      }

      for (var square = 1; square <= 8; square++) {
        const item = {
          className: square % 2 === 0 ? dark : light,
          hero: null
        }
        squares[`${row}${square}`] = item;
      }
    }
    return squares;
  }

  onDrag = (event, id, hero) => {
    event.preventDefault();
    this.setState(oldState => {
      return {
        ...oldState,
        squares: {
          ...oldState.squares,
          [id]: {
            ...oldState.squares[id]
          }
        },
        selectedHero: hero,
        previousSquare: id,
      }
    })
  }

  onDragOver = (event) => {
    event.preventDefault();
  }

  onDrop = (event, id) => {
    console.log(id);
    if (!id) {
      return;
    }
    if (this.state.squares[id].hero) {
      return;
    }

    this.setState(oldState => {
      const state = {
        ...oldState,
        squares: {
          ...oldState.squares,
          [id]: {
            ...oldState.squares[id],
            hero: oldState.selectedHero
          },
          [oldState.previousSquare]: {
            ...oldState.squares[oldState.previousSquare],
            hero: null
          }
        },
        selectedHero: null,
        previousSquare: null
      }
      console.log(state);
      return state;
    });
  }

  render() {
    const { squares } = this.state;
    const actions = {
      onDrop:  this.onDrop.bind(this),
      onDragOver: this.onDragOver.bind(this),
      onDrag: this.onDrag.bind(this)
    }
    return (
      <div className="chessboard">
        {
          Object.keys(squares).map(key => {
            const hero = squares[key].hero;
            const imagePath = hero ? `${hero.toLowerCase().split(' ').join('_')}_full.png` : undefined;
            const image = this.props.images[imagePath]
            return (
              <Square
                actions={actions}
                key={`square-${key}`}
                className={squares[key].className}
                index={key}
                image={image}
                hero={hero}
              />
            )
          })
        }
      </div>

    )
  }
};

export default Chessboard;
