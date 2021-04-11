import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { StyledFilterButton } from './styles';

const FilterButton = ({ account, onClick }) => {
  const { twitterAccountsById } = useSelector((state) => state.twitterReducer);
  const [isSelected, setIsSelected] = useState(true);

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
