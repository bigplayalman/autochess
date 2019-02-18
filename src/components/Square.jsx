import React from "react";
// import { Hero } from "./Hero";


const Square = ({ className, actions, index, hero, image }) => {
  return (
    <div
      className={className}
      onDrop={event => actions.onDrop(event, index)}
      onDragOver={event => actions.onDragOver(event)}
    >
      {
        image ?
          <div
            className="hero"
            style={{ 'backgroundImage': `url(${image})` }}
            draggable
            onDrag={(event) => actions.onDrag(event, index, hero)}
          />
          :
          null
      }
    </div>
  )
};

export default Square;
