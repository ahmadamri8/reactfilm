// FilterItem.jsx

import React from 'react';

const FilterItem = ({ category, options, selectedOption, onSelect }) => {
  return (
    <div>
      <h3>{category}</h3>
      <select value={selectedOption} onChange={(e) => onSelect(category, e.target.value)}>
        <option value="">All</option>
        {options && options.length > 0 && options.map(option => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
    </div>
  );
};

export default FilterItem;
