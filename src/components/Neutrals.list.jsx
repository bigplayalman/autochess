import React, { Component } from "react";
import { connect } from "react-redux";
import classnames from "classnames";

export class NeutralsList extends Component {
  getImage(name) {
    const image = this.props.images[`${name.toLowerCase().split(' ').join('_')}_full.png`];
    return image;
  }

  render() {
    const containerClasses = classnames({
      'neutrals-container': true,
      'show': this.props.show
    });
    return (
      <div className={containerClasses}>
        neutrals
      </div>
    );
  }
};

const getData = (state, store) => state[store];

const mapStateToProps = (state) => {
  return {
    images: getData(state, 'images')
  };
};

const NeutralsListConnected = connect(mapStateToProps, null)(NeutralsList);
export default NeutralsListConnected;
