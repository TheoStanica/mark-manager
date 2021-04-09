import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Select from 'react-select';

const ConnectedAccountsDropdown = ({ onSelected, reset }) => {
  const [selectedOption, setSelectedOption] = useState([]);
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
    const accountsSelected = selected?.map((acc) => acc.twitterUserId);
    onSelected(accountsSelected);
  };

  const formatOptionLabel = ({ profileImage, screenName }) => (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <img
        src={profileImage}
        alt={screenName}
        style={{ width: 21, height: 21, marginRight: 3 }}
      />
      <p>{screenName}</p>
    </div>
  );

  return (
    <Select
      value={selectedOption}
      formatOptionLabel={formatOptionLabel}
      isMulti={true}
      options={twitterOptions}
      onChange={handleChange}
      isSearchable={true}
      noOptionsMessage={() => 'No other accounts connected'}
    />
  );
};

export default ConnectedAccountsDropdown;
