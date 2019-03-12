import React from 'react';
import { DragSource } from 'react-dnd';

const heroSource = {
  beginDrag(props) {
    return props;
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}

function Hero({ connectDragSource, isDragging, name, image }) {
  return connectDragSource(
    <div className="drag-hero"
      style={{
        opacity: isDragging ? 0.5 : 1,
        backgroundImage: `url(${image})`
      }}>
    </div>
  );
}

export default DragSource('hero', heroSource, collect)(Hero);
