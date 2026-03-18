import React from 'react';

const FilterButtons = ({ categories, activeCategory, onCategoryChange }) => {
  return (
    <div className="flex flex-wrap justify-center gap-4 mb-12">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={`px-3 md:px-6 py-1 md:py-2 rounded-full text-[10px] md:text-sm uppercase tracking-wider font-semibold transition-all ${
            activeCategory === category
              ? 'bg-primary text-white scale-105 shadow-[0_0_15px_-3px_#dc2626]'
              : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default FilterButtons;
