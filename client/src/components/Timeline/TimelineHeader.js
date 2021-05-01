import React from 'react';
import Icon from '../Icon/Icon';
import { StyledTimelineHeader, StyledSpan } from './styles';
import Reload from '../../assets/Pictures/Reload';
import Trashcan from '../../assets/Pictures/Trashcan';

const TimelineHeader = ({ type, account, onRefresh, onRemove, ...rest }) => {
  return (
    <StyledTimelineHeader {...rest}>
      <div>
        <StyledSpan>{type}</StyledSpan>@{account}
      </div>
      <div style={{ display: 'flex' }}>
        <Icon
          size={22}
          tooltip="Refresh"
          onClick={onRefresh}
          position={'top-start'}
          offset={[0, 5]}
        >
          <Reload color="#fff" />
        </Icon>
        <Icon
          style={{ marginLeft: '.5rem' }}
          size={22}
          tooltip="Remove"
          position={'top-start'}
          offset={[0, 5]}
          onClick={onRemove}
        >
          <Trashcan color="#fff" />
        </Icon>
      </div>
    </StyledTimelineHeader>
  );
};

export default TimelineHeader;
