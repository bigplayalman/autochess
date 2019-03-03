import React from "react";
import { DropTarget } from 'react-dnd';

const squareTarget = {
  drop(props, monitor) {
    const item = monitor.getItem();
    props.updatePosition(item.name, props.position);
  },
  canDrop(props) {
    return !props.children;
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  };
}

function Square({ connectDropTarget, isOver, children }) {
  return connectDropTarget(
    <div className="square" style={{
      position: 'relative',
      width: '100%',
      height: '100%'
    }}>
      {children}
      {isOver &&
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          height: '100%',
          width: '100%',
          zIndex: 1,
          opacity: 0.5,
          backgroundColor: 'yellow',
        }} />
      }
    </div>
  );
}

export default DropTarget('hero', squareTarget, collect)(Square);
