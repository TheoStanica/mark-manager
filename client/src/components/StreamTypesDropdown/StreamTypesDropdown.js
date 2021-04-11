import React, { useState, useEffect } from 'react';
import Select from 'react-select';

const options = [
  { value: 'home_timeline', label: 'Home Timeline' },
  { value: 'search', label: 'Search' },
];

const StreamTypesDropdown = ({ onSelected, reset }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    if (reset) {
      setSelectedOption(null);
    }
  }, [reset]);

  const handleChange = (selected) => {
    setSelectedOption(selected);
    onSelected(selected.value);
  };

  return (
    <Select
      styles={{ menu: (provided) => ({ ...provided, zIndex: 9999 }) }}
      value={selectedOption}
      options={options}
      onChange={handleChange}
      isSearchable={true}
    />
  );
};

export default StreamTypesDropdown;
