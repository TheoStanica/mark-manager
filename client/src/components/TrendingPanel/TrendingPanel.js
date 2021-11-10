import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import { Chip, Stack } from '@mui/material';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchTrends,
  setTrends,
} from '../../redux/actions/twitterTrendsActions';
import Loading from '../Loading/Loading';
import LocationSearch from '../LocationSearch/LocationSearch';

const TrendingPanel = ({ isVisible, twitterUserId, onSelectedTrend }) => {
  const dispatch = useDispatch();
  const [woeid, setWoeid] = useState(1);
  const { trends, isLoading } = useSelector(
    (state) => state.twitterTrendsReducer
  );

  useEffect(() => {
    const fetch = async () => {
      if (isVisible) {
        dispatch(await fetchTrends({ twitterUserId, woeid }));
      } else {
        dispatch(setTrends({ trends: [] }));
      }
    };
    fetch();
  }, [isVisible, twitterUserId, dispatch, woeid]);

  const renderTrends = () => {
    if (trends?.length === 0) {
      return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <p>No trending topics</p>
        </div>
      );
    }
    return trends.map((trend, index) => renderChip(trend, index));
  };

  const renderChip = (trend, key) => (
    <Chip
      key={key}
      label={trend.name}
      color="primary"
      style={{ background: '#168abc' }}
      clickable
      onClick={() => onSelectedTrend(trend.name)}
    />
  );

  return isVisible ? (
    <StyledPanelWrapper>
      <Typography variant="h6" mb={2}>
        Trending Right Now
      </Typography>
      <LocationSearch
        twitterUserId={twitterUserId}
        onUpdatedWOEID={(id) => setWoeid(id)}
      />

      <StyledChipWrapper>
        <Stack direction="column" spacing={1} mr={0.2}>
          {isLoading ? <Loading /> : renderTrends()}
        </Stack>
      </StyledChipWrapper>
    </StyledPanelWrapper>
  ) : null;
};

export default TrendingPanel;

const StyledPanelWrapper = styled.div`
  margin-left: 16px;
  max-width: 300px;
  min-width: 300px;
  display: flex;
  flex-direction: column;
  // background: pink;

  @media only screen and (max-width: 1000px) {
    margin: auto;
    max-width: 100%;
    min-width: 100%;
  }
`;

const StyledChipWrapper = styled.div`
  flex: 1;
  max-height: 160px;
  overflow: scroll;
`;
