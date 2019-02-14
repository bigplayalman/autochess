import React from "react";
import { Hero } from "./Hero";

const HeroList = ({heroes, selectHero, images, className, selectedHeroes, disabled}) => {
  return (
    <div className={className}>
      {heroes.map((hero, index) => {
        const props = {
          ...hero,
          images,
          selectHero,
          selected: selectedHeroes.filter(x => x.name === hero.name).length,
          disabled
        };
        return <Hero key={`${hero.name}-${index}-${className}`} {...props} />;
      })}
    </div>
  );
};

export default HeroList;
