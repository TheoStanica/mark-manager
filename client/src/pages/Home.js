import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header/Header';
import { decreaseValue, increaseValue } from '../redux/actions/valueActions';
import { isLoggedin } from '../services/isLoggedIn';

const Home = () => {
  const value = useSelector((state) => state.valueReducer.value);
  const dispatch = useDispatch();

  return isLoggedin() ? (
    <Redirect to="/dashboard" />
  ) : (
    <div className="home" style={{ width: '100%' }}>
      <Header className="normal" />
      <div>value ={value}</div>
      <button
        className="btn btn-primary me-2"
        onClick={() => dispatch(increaseValue(value))}
      >
        +1
      </button>
      <button
        className="btn btn-primary"
        onClick={() => dispatch(decreaseValue(value))}
      >
        -1
      </button>
    </div>
  );
};

export default Home;
