import axiosInstance from '../../api/buildClient';
import {
  SET_ERRORS,
  TWITTER_SET_TRENDS,
  TWITTER_SET_TRENDS_LOADING_STATUS,
} from '../types';
import { TwitterEndpoints } from '../../services/twitterApiEndpoints';
import axios from 'axios';

const handleError = ({ error }) => async (dispatch) => {
  if (error?.response?.data?.errors) {
    dispatch({
      type: SET_ERRORS,
      payload: {
        errors: error.response.data.errors,
      },
    });
  } else {
    dispatch({
      type: SET_ERRORS,
      payload: {
        errors: [{ message: 'Something went wrong' }],
      },
    });
  }
};

export const setTrendsLoadingStatus = ({ isLoading }) => {
  return {
    type: TWITTER_SET_TRENDS_LOADING_STATUS,
    payload: {
      isLoading,
    },
  };
};

export const setTrends = ({ trends }) => {
  return {
    type: TWITTER_SET_TRENDS,
    payload: {
      trends,
    },
  };
};

export const fetchTrends = ({ twitterUserId, woeid }) => async (dispatch) => {
  try {
    await dispatch(setTrendsLoadingStatus({ isLoading: true }));

    const trends = await axiosInstance.get(
      TwitterEndpoints.twitterTrendsEndpoint({ twitterUserId, woeid })
    );
    await dispatch(setTrends({ trends: trends.data.trends }));

    await dispatch(setTrendsLoadingStatus({ isLoading: false }));
  } catch (err) {
    dispatch(handleError({ error: err }));
  }
};

export const fetchTrendingLocations = ({
  twitterUserId,
  location,
  onFinish,
}) => async (dispatch) => {
  try {
    if (location) {
      const weatherResult = await axios.get(
        `https://meta-weather.now.sh/api/location/search/?query=${location}`
      );
      const coords = weatherResult?.data[0]?.latt_long.split(',');

      if (coords) {
        const trendingLocation = await axiosInstance.get(
          TwitterEndpoints.twitterTrendingLocationsEndpoint({
            twitterUserId,
            lat: coords[0],
            long: coords[1],
          })
        );
        onFinish(trendingLocation.data);
      } else {
        onFinish([]);
      }
    } else {
      onFinish([]);
    }
  } catch (err) {
    dispatch(handleError({ error: err }));
  }
};
