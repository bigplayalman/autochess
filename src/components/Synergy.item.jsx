import React from "react";
import classnames from "classnames";

export const SynergyItem = ({ name, heroes, effects, images }) => {
  const synergyImage = images[name + '.png'];
  const containerClasses = classnames({
    'synergy-item-container': true,
    tall: heroes.length > 3
  })
  return (
    <div className={containerClasses}>
      <div className="synergy-item-header">
        <img src={synergyImage} alt={name} />
        <div className="synergy-item-title">
          {name}
        </div>
      </div>


      <div className="synergy-item-effects">
        {Object.keys(effects).map((effect, index) => {
          if (isNaN(effect)) {
            return null;
          }
          return (
            <div key={index}>
              {effect}: {effects[effect]}
            </div>
          );
        })}
      </div>
      <div className="synergy-item-heroes">
        {
          heroes.map((hero, index) => {
            return (
              <div key={index}>
                <img src={images[`${hero.toLowerCase().split(' ').join('_')}_full.png`]} alt={hero} />
                <div>
                  {hero}
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  );
}
export default SynergyItem;
