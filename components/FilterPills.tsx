import React from 'react';

export const FilterPills = () => {
  const filters = ['All', 'House', 'Apartment', 'Villa', 'Penthouse'];
  
  return (
    <div className="flex items-center justify-center gap-3 overflow-x-auto hide-scroll py-2 px-4 -mx-4">
      {filters.map((filter) => (
        <button 
          key={filter}
          className={`whitespace-nowrap px-5 py-2 rounded-full text-sm font-medium transition-all ${
            filter === 'All' 
              ? 'bg-nordic-dark text-white shadow-lg shadow-nordic-dark/10 hover:-translate-y-0.5'
              : 'bg-white border border-nordic-dark/5 text-nordic-muted hover:text-nordic-dark hover:border-mosque/50 hover:bg-mosque/5'
          }`}
        >
          {filter}
        </button>
      ))}
      
      <div className="w-px h-6 bg-nordic-dark/10 mx-2"></div>
      
      <button className="whitespace-nowrap flex items-center gap-1 px-4 py-2 rounded-full text-nordic-dark font-medium text-sm hover:bg-black/5 transition-colors">
        <span className="material-icons text-base">tune</span> Filters
      </button>
    </div>
  );
};