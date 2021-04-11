import React, { useState } from 'react';
import { usePopper } from 'react-popper';
import ReactDOM from 'react-dom';
import ClearButton from '../ClearButton/ClearButton';
import { StyledFilterDiv } from './styles';
import { useDispatch, useSelector } from 'react-redux';
import FilterButton from './FilterButton';
import { filterAccounts } from '../../redux/actions/twitterActions';

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

  const renderAccountsFilters = () => {
    return twitterAccounts.map((account, idx) => (
      <FilterButton
        key={idx}
        account={account}
        onClick={(account) => {
          const filteredAccounts = selectedAccountFilter.includes(account)
            ? selectedAccountFilter.filter((acc) => acc !== account)
            : [...selectedAccountFilter, account];
          setSelectedAccountFilter(filteredAccounts);
          dispatch(filterAccounts({ accounts: filteredAccounts }));
        }}
      />
    ));
  };

  return (
    <>
      <ClearButton ref={setReferenceElement} onClick={() => setIsOpen(!isOpen)}>
        Filter
      </ClearButton>
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
