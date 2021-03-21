import React from 'react';
import Icon from '../Icon/Icon';
import { Assets } from '../../assets';
import './Timeline.css';

const TimelineHeader = ({
  className,
  type,
  account,
  onRefresh,
  onRemove,
  ...rest
}) => {
  return (
    <div className={`timeline-header ${className ? className : ''}`} {...rest}>
      <div className="info">
        <span className="type">{type}</span>@{account}
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
          className="ml-05"
          size={24}
          tooltip="Remove"
          onClick={onRemove}
        ></Icon>
      </div>
    </div>
  );
};

export default TimelineHeader;
