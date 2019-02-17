import React, { Component } from "react";
// import { Hero } from "./Hero";
import { DragDropContextProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

class Chessboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      heroes: props.heroes,
      squares: this.generateChessboard()
    }
  }
  generateChessboard() {
    const squares = []
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
          className: square % 2 === 0 ? dark : light
        }
        squares.push(item);
      }
    }

    return squares;
  }
  render() {
    return (
      <DragDropContextProvider backend={HTML5Backend}>
        <div className="chessboard">
          {
            this.state.squares.map((square, index) => {
              return (
                <div key={`square-${index}`} className={square.className}>
                  {index}
                </div>
              )
            })
          }
        </div>
      </DragDropContextProvider>

    )
  }
};

export default Chessboard;
