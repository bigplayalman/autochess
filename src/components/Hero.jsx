import React from 'react';
import classnames from 'classnames'

export const Hero = (props) => {
  const {
    name,
    image,
    selected,
    hero,
    selectHero } = props;

  const styles = classnames({
    'hero': true,
    selected
  })

  const getHeroProps = () => {
    const props = [];
    Object.keys(hero).map(prop => {
      if (hero[prop] === true) {
        props.push(<span key={`${name}-${prop}`} className={prop}>{prop}</span>);
      }
      return prop;
    });
    return props;
  }

  return (
    <div
      className={styles}
      onClick={(e) => selectHero(name)}
    >
      <div className="hero-icon" style={{ 'backgroundImage': `url(${image})` }}/>
      <div className="hero-body">
        <strong className={`cost-${hero.cost}`}>
          {name}
          <span>
            ${hero.cost}
          </span>
        </strong>
        {getHeroProps()}
      </div>
    </div>
  )
}
