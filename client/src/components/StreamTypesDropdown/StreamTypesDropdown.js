import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { withTheme } from 'styled-components';

const options = [
  { value: 'home_timeline', label: 'Home Timeline' },
  { value: 'search', label: 'Search' },
];

const StreamTypesDropdown = ({ onSelected, reset, theme }) => {
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
      styles={{
        menu: (base) => ({
          ...base,
          zIndex: 9999,
          background: theme.pref === 'dark' ? '#23272A' : 'white',
          boxShadow: '0 0 1rem 0 rgb(0 0 0 / 50%)',
          color: theme.pref === 'dark' ? '#ddda' : 'black',
        }),
        control: (base) => ({
          ...base,
          background: theme.pref === 'dark' ? '#30353a' : 'initial',
          borderColor: theme.pref === 'dark' ? '#ddda' : 'initial',
        }),
        singleValue: (base) => ({
          ...base,
          color: theme.pref === 'dark' ? 'white' : 'black',
        }),
        option: (base, { isFocused }) => ({
          ...base,
          background: isFocused ? '#168abc' : 'initial',
          color: theme.pref === 'dark' ? 'white' : 'black',
        }),
      }}
      value={selectedOption}
      options={options}
      onChange={handleChange}
      isSearchable={true}
    />
  );
};

export default withTheme(StreamTypesDropdown);
