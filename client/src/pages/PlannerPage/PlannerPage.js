import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import VerticalMenu from '../../components/VerticalMenu/VerticalMenu';
import { StyledSettings } from './styles';

import { fetchScheduledTweets } from '../../redux/actions/scheduledTweetsActions';
import Planner from '../../components/Planner/Planner';

const PlannerPage = () => {
  useSelector((state) => state.userReducer.present);

  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(fetchScheduledTweets());
  }, [dispatch]);

  return (
    <>
      <VerticalMenu />
      <StyledSettings style={{ color: 'red', backgroundColor: 'white' }}>
        <Planner />
      </StyledSettings>
    </>
  );
};

export default PlannerPage;