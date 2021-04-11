import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { StyledFilterButton } from './styles';

const FilterButton = ({ account, onClick }) => {
  const { twitterAccountsById, twitterFilteredAccounts } = useSelector(
    (state) => state.twitterReducer
  );
  const [isSelected, setIsSelected] = useState(
    twitterFilteredAccounts.includes(account)
  );

  const handleClick = () => {
    onClick(account);
    setIsSelected(!isSelected);
  };

  return (
    <StyledFilterButton onClick={handleClick} isSelected={isSelected}>
      {twitterAccountsById[account].screenName}
    </StyledFilterButton>
  );
};
export default FilterButton;
