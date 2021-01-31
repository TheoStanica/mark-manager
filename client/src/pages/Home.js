import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { decreaseValue, increaseValue } from '../redux/actions/valueActions';

const Home = () => {
  const value = useSelector((state) => state.valueReducer.value);
  const dispatch = useDispatch();

  return (
    <div className="ui container">
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
