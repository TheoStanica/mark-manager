import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Select from 'react-select';
import { withTheme } from 'styled-components';
import styled from 'styled-components';

const StyledOptionText = styled.p`
  color: ${(props) => (props.theme.pref === 'dark' ? '#fff' : 'black')};
`;

const ConnectedAccountsDropdown = ({
  onSelected,
  reset,
  isMulti,
  theme,
  initialValue,
  isDisabled,
}) => {
  const [selectedOption, setSelectedOption] = useState(initialValue || []);
  const { twitterAccounts, twitterAccountsById } = useSelector(
    (state) => state.twitterReducer
  );
  const twitterOptions = twitterAccounts?.map((acc) => {
    twitterAccountsById[acc].value = twitterAccountsById[acc].screenName;
    return twitterAccountsById[acc];
  });

  useEffect(() => {
    if (reset) {
      setSelectedOption([]);
    }
  }, [reset]);

  const handleChange = (selected) => {
    setSelectedOption(selected);
    if (isMulti) {
      const accountsSelected = selected.map((acc) => acc.twitterUserId);
      onSelected(accountsSelected);
    } else {
      onSelected(selected.twitterUserId);
    }
  };

  const formatOptionLabel = ({ profileImage, screenName }) => (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <img
        src={profileImage}
        alt={screenName}
        style={{ width: 21, height: 21, marginRight: 3, borderRadius: '100%' }}
      />
      <StyledOptionText>{screenName}</StyledOptionText>
    </div>
  );

  return (
    <Select
      styles={{
        menu: (base) => ({
          ...base,
          zIndex: 9999,
          background: theme.pref === 'dark' ? '#23272A' : 'white',
          boxShadow: '0 0 1rem 0 rgb(0 0 0 / 50%)',
          color: theme.pref === 'dark' ? '#ddda' : 'initial',
        }),
        control: (base) => ({
          ...base,
          background: theme.pref === 'dark' ? '#30353a' : 'initial',
          borderColor: theme.pref === 'dark' ? '#ddda' : 'initial',
        }),
        multiValue: (base) => ({
          ...base,
          background: theme.pref === 'dark' ? '#23272A' : '#ddda',
          color: theme.pref === 'dark' ? '#ddda' : 'initial',
        }),
        option: (base, { isFocused }) => ({
          ...base,
          background: isFocused ? '#168abc' : 'initial',
        }),
      }}
      value={selectedOption}
      formatOptionLabel={formatOptionLabel}
      isMulti={isMulti}
      options={twitterOptions}
      onChange={handleChange}
      isSearchable={true}
      noOptionsMessage={() => 'No other accounts connected'}
      isDisabled={isDisabled}
    />
  );
};

export default withTheme(ConnectedAccountsDropdown);
