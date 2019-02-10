import React from 'react';

export const Hero = (props) => {
  const {name, images} = props;
  const portrait = `${name.toLowerCase().split(' ').join('_')}_full.png`;
  const image = images[portrait];

  if (!image) {
    console.log(image, portrait);
  }
  return (
    <div className="hero">
      <img src={image} alt={name}/>
      {/* {name} */}
    </div>
  )
}
