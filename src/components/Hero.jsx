import React from 'react';
import classnames from 'classnames'

export const Hero = (props) => {
  const {name, images, selectHero, portrait, selected, disabled} = props;
  const path = portrait ? portrait : `${name.toLowerCase().split(' ').join('_')}_full.png`;
  const image = images[path];
  const styles = classnames({
    'hero': true,
    selected,
    disabled: disabled && !selected
  })

  return (
    <div className={styles} onClick={(e) => selectHero(e, props)}>
      <img src={image} alt={name}/>
    </div>
  )
}
