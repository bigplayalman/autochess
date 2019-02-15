import React from "react";

const FilterList = ({ className, filters, title, setFilter }) => {
  return (
    <div className={className}>
      <strong>{title}</strong>
        {Object.keys(filters).map((key, index) => {
          let effectClass = '';
          if (filters[key]) {
            effectClass = 'selected'
          }

          return (
            <div className={effectClass} key={`${key}-${index}-${className}`} onClick={() => {setFilter(key)}}>
              {key}
            </div>
          );
        })}

    </div>
  );
};

export default FilterList;
