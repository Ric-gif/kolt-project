import React from 'react';

const SortKolt = ({ koltData, setKoltData }) => {
  const handleSort = (criteria) => {
    const sortedData = [...koltData].sort((a, b) => {
      if (criteria === 'time') {
        return new Date(a.time) - new Date(b.time);
      } else if (criteria === 'distance') {
        return a.distance - b.distance;
      } else if (criteria === 'availability') {
        return a.availability.localeCompare(b.availability);
      }
      return 0;
    });
    setKoltData(sortedData);
  };

  return (
    <div className='sort-container'>
      <button onClick={() => handleSort('time')}>Sort by Time</button>
      <button onClick={() => handleSort('distance')}>Sort by Distance</button>
      <button onClick={() => handleSort('availability')}>Sort by Availability</button>
    </div>
  );
};

export default SortKolt;