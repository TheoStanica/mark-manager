import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { StyledFilterButton } from './styles';

const FilterButton = ({ account, onClick }) => {
  const { twitterAccountsById, twitterFilteredAccounts } = useSelector(
    (state) => state.twitterReducer
  );
  const [isSelected, setIsSelected] = useState(false);

  useEffect(() => {
    setIsSelected(twitterFilteredAccounts?.includes(account));
  }, [twitterFilteredAccounts, account]);

  return (
    <StyledFilterButton
      onClick={() => onClick(account)}
      isSelected={isSelected}
    >
      {twitterAccountsById[account].screenName}
    </StyledFilterButton>
  );
};
export default FilterButton;
