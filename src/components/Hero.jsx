import React from 'react';
import classnames from 'classnames'

export const Hero = (props) => {
  const {
    name,
    image,
    selected,
    disabled,
    selectHero } = props;

  const styles = classnames({
    'hero': true,
    selected,
    disabled
  })

  return (
    <div
      className={styles}
      style={{ 'backgroundImage': `url(${image})` }}
      onClick={(e) => selectHero(name)}
    >
      <span>
        {name}
      </span>
    </div>
  )
}
