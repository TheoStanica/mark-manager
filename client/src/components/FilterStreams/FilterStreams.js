import React, { useEffect, useState } from 'react';
import { StyledFilterDiv } from './styles';
import { useDispatch, useSelector } from 'react-redux';
import FilterButton from './FilterButton';
import { filterAccounts } from '../../redux/actions/twitterActions';
import Icon from '../Icon/Icon';
import Filter from '../../assets/Pictures/Filter';
import CustomPopper from '../CustomPopper/CustomPopper';
import { withTheme } from 'styled-components';

const FilterStreams = ({ theme }) => {
  const { twitterAccounts, twitterFilteredAccounts } = useSelector(
    (state) => state.twitterReducer
  );
  const [selectedAccountFilter, setSelectedAccountFilter] = useState(
    twitterFilteredAccounts
  );
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setSelectedAccountFilter(twitterFilteredAccounts);
  }, [twitterFilteredAccounts]);

  const renderAccountsFilters = () => {
    return twitterAccounts.map((account, idx) => (
      <FilterButton
        key={idx}
        account={account}
        onClick={(account) => {
          const filteredAccounts = selectedAccountFilter.includes(account)
            ? selectedAccountFilter.filter((acc) => acc !== account)
            : [...selectedAccountFilter, account];
          dispatch(filterAccounts({ accounts: filteredAccounts }));
        }}
      />
    ));
  };

  return (
    <>
      <CustomPopper
        open={isOpen}
        style={{ marginRight: '.5rem' }}
        placement="bottom-end"
        popper={
          <StyledFilterDiv>
            <div style={{ marginBottom: '0.5rem', fontSize: '1.5rem' }}>
              Filter streams
            </div>
            {renderAccountsFilters()}
          </StyledFilterDiv>
        }
      >
        <Icon onClick={() => setIsOpen(!isOpen)}>
          <Filter size={35} color={theme.pref === 'dark' ? 'white' : '#333'} />
        </Icon>
      </CustomPopper>
    </>
  );
};

export default withTheme(FilterStreams);
