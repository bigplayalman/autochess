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
        <strong>
          Neutrals List <br />
        </strong>
        Round 1 - Radiant Creeps<br />
        Round 2 - Radiant Mega Creeps<br />
        Round 3 - Radiant Alpha Creeps<br />
        Round 10 - Golems<br />
        Round 15 - Wolves<br />
        Round 20 - Furbolgs<br />
        Round 25 - Wildkins<br />
        Round 30 - Lizards<br />
        Round 35 - Dragon<br />
        Round 40 - Trolls<br />
        Round 45 - Niancat<br />
        Round 50 - Rosh<br />
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
