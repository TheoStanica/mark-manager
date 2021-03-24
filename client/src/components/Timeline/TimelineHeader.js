import React from 'react';
import Icon from '../Icon/Icon';
import { Assets } from '../../assets';
import { StyledTimelineHeader, StyledSpan } from './styles';

const TimelineHeader = ({ type, account, onRefresh, onRemove, ...rest }) => {
  return (
    <StyledTimelineHeader {...rest}>
      <div>
        <StyledSpan>{type}</StyledSpan>@{account}
      </div>
      <div>
        <Icon
          icon={Assets.Pictures.RefreshIcon}
          size={24}
          tooltip="Refresh"
          onClick={onRefresh}
        ></Icon>
        <Icon
          icon={Assets.Pictures.TrashCan}
          style={{ marginLeft: '.5rem' }}
          size={24}
          tooltip="Remove"
          onClick={onRemove}
        ></Icon>
      </div>
    </StyledTimelineHeader>
  );
};

export default TimelineHeader;
