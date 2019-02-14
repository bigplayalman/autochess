import React from "react";

const SynergyList = ({ className, synergies, activeSynergies, title }) => {
  return (
    <div className={className}>
      <strong>{title}</strong>
        {synergies.map((synergy, index) => {
          let effectClass = '';
          if (activeSynergies.filter(x => x.effect === synergy.effect && x.count === synergy.count).length) {
            effectClass = 'selected'
          }

          return (
            <div className={effectClass} key={`${synergy.type}-${index}-${className}`}>
              {synergy.count} {synergy.type}
              <div>{synergy.effect}</div>
            </div>
          );
        })}

    </div>
  );
};

export default SynergyList;
