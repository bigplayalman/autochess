import React from "react";

const TypeList = ({className, types, title}) => {
  return (
    <div className={className}>
    <strong>{title}</strong>
      {Object.keys(types).map((key, index) => {
        return (
          <div key={`${key}-${index}-${className}`}>
            {key}: {types[key]}
          </div>
        );
      })}
    </div>
  );
};

export default TypeList;
