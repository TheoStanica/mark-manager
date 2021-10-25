import React from 'react';
import { withTheme } from 'styled-components';
import AsyncSelect from 'react-select/async';
import { CircularProgress } from '@mui/material';
import { debounce } from '@mui/material';
import { fetchTrendingLocations } from '../../redux/actions/twitterTrendsActions';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

const defaultPlace = [
  {
    name: 'Worldwide',
    woeid: 1,
  },
];

const LoadingIndicator = () => {
  return (
    <StyledLoadingIndicatorWrapper>
      <CircularProgress size={20} />
    </StyledLoadingIndicatorWrapper>
  );
};

const LocationSearch = ({ theme, onUpdatedWOEID, twitterUserId }) => {
  const dispatch = useDispatch();

  const promiseOptions = (inputValue, callback) =>
    new Promise(async (resolve) => {
      dispatch(
        fetchTrendingLocations({
          twitterUserId,
          location: inputValue,
          onFinish: (locations) => {
            resolve(callback(locations));
          },
        })
      );
    });

  const formatOptionLabel = (place) => <div>{place.name}</div>;

  const debouncedOptions = debounce(
    (value, cb) => promiseOptions(value, cb),
    1000
  );

  return (
    <div style={{ marginBottom: 25 }}>
      <AsyncSelect
        styles={selectStyles(theme)}
        cacheOptions
        placeholder="Search Location..."
        defaultOptions={defaultPlace}
        formatOptionLabel={formatOptionLabel}
        loadOptions={debouncedOptions}
        components={{ LoadingIndicator }}
        loadingMessage={() => 'Searching trending locations..'}
        noOptionsMessage={() => 'No trending locations found '}
        onChange={(location) => onUpdatedWOEID(location.woeid)}
      />
    </div>
  );
};

const selectStyles = (theme) => ({
  menu: (base) => ({
    ...base,
    zIndex: 9999,
    background: theme.pref === 'dark' ? '#23272A' : 'white',
    boxShadow: '0 0 1rem 0 rgb(0 0 0 / 50%)',
    color: theme.pref === 'dark' ? '#white' : 'initial',
  }),
  control: (base) => ({
    ...base,
    background: theme.pref === 'dark' ? '#30353a' : 'initial',
    borderColor: theme.pref === 'dark' ? '#ddda' : 'initial',
  }),
  multiValue: (base) => ({
    ...base,
    background: theme.pref === 'dark' ? '#23272A' : 'white',
    color: theme.pref === 'dark' ? 'white' : 'initial',
  }),
  option: (base, { isFocused }) => ({
    ...base,
    background: isFocused ? '#168abc' : 'initial',
  }),
  input: (base) => ({
    ...base,
    color: theme.pref === 'dark' ? 'white' : 'black',
  }),
  singleValue: (base) => ({
    ...base,
    color: theme.pref === 'dark' ? 'white' : 'black',
  }),
});

const StyledLoadingIndicatorWrapper = styled.div`
  margin-right: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default withTheme(LocationSearch);
