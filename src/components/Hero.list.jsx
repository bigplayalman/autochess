import React from "react";
import { Hero } from "./Hero";

const HeroList = ({heroes, selectHero, images, className, selectedHeroes, disabled, filters = {}}) => {
  const activeFilters = [];
  Object.keys(filters).map((key) => {
    if (filters[key]) {
      activeFilters.push(key);
    }
    return key;
  });
  const filteredHeroes = [];
  activeFilters.map(filter => {
    heroes.map(hero => {
      if(hero[filter]) {
        filteredHeroes.push(hero);
      }
      return hero;
    })
    return filter;
  })

  const activeHeroes = filteredHeroes.length ? filteredHeroes : heroes;
  return (
    <div className={className}>
      {activeHeroes.map((hero, index) => {
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
