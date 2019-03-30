import React from "react";
import { DropTarget } from 'react-dnd';

const squareTarget = {
  drop(props, monitor) {
    const item = monitor.getItem();
    props.updatePosition(item.name, props.position);
  },
  canDrop(props) {
    return props.children === undefined;
  },
  hover(props, monitor) {
    console.log(props, monitor.getItem());
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
  };
}

function Square({ connectDropTarget, isOver, canDrop, children, position, onClick }) {
  const renderOverlay = (color) => {
    return (
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 1,
        opacity: 0.2,
        backgroundColor: color,
      }} />
    );
  }
  return connectDropTarget(
    <div className="square"
      onClick={() => onClick(position)}
      style={{
      position: 'relative'
    }}>
      {children}
      {isOver && !canDrop && renderOverlay('red')}
      {!isOver && canDrop && renderOverlay('yellow')}
      {isOver && canDrop && renderOverlay('green')}
    </div>
  );
}

export default DropTarget('hero', squareTarget, collect)(Square);
