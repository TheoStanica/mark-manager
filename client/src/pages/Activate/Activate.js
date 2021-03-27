import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Redirect, useParams } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Loading from '../../components/Loading/Loading';
import { activateAccount } from '../../redux/actions/userActions';
import { isLoggedin } from '../../services/isLoggedIn';
// import './Activate.css';
import { StyledActivate } from './styles';

const ActivateAccount = () => {
  const [status, setStatus] = useState('loading');
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    const activateRequest = async () => {
      const status = await dispatch(activateAccount({ id: id }));
      setIsLoading(false);
      setStatus(status);
    };
    activateRequest();
  }, [id, dispatch]);

  const renderMessage = () => {
    if (status === true) {
      return <p>Account activated</p>;
    } else if (status === false) {
      return <p>Couldn't activate your account..</p>;
    }
  };

  return isLoggedin() ? (
    <Redirect to="/dashboard" />
  ) : (
    <>
      <Header />
      <StyledActivate>
        {isLoading ? <Loading /> : renderMessage()}
      </StyledActivate>
    </>
  );
};

export default ActivateAccount;
