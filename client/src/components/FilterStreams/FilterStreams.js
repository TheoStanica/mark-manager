import React, { useEffect, useState } from 'react';
import { usePopper } from 'react-popper';
import ReactDOM from 'react-dom';
import { StyledFilterDiv } from './styles';
import { useDispatch, useSelector } from 'react-redux';
import FilterButton from './FilterButton';
import { filterAccounts } from '../../redux/actions/twitterActions';
import Icon from '../Icon/Icon';
import Filter from '../../assets/Pictures/Filter';

const FilterStreams = () => {
  const [referenceElement, setReferenceElement] = useState(null);
  const [popperElement, setPopperElement] = useState(null);
  const { twitterAccounts, twitterFilteredAccounts } = useSelector(
    (state) => state.twitterReducer
  );
  const [selectedAccountFilter, setSelectedAccountFilter] = useState(
    twitterFilteredAccounts
  );
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: 'top-start',
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [0, 10],
        },
      },
    ],
  });

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
      <Icon
        ref={setReferenceElement}
        onClick={() => setIsOpen(!isOpen)}
        style={{ marginRight: '.5rem' }}
      >
        <Filter size={35} color={'#333'} />
      </Icon>
      {isOpen &&
        ReactDOM.createPortal(
          <StyledFilterDiv
            ref={setPopperElement}
            style={styles.popper}
            {...attributes.popper}
          >
            <div style={{ marginBottom: '0.5rem', fontSize: '1.5rem' }}>
              Filter streams
            </div>
            {renderAccountsFilters()}
          </StyledFilterDiv>,
          document.body
        )}
    </>
  );
};

export default FilterStreams;
