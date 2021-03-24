import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logoutUser } from '../../redux/actions/userActions';
import Card from '../Card/Card';
import CardBody from '../Card/CardBody';
import CreateTweet from '../CreateTweet/CreateTweet';
import Popover from '../Popover/Popover';
import VerticalMenuItem from './VerticalMenuItem';
import { Assets } from '../../assets';
import {
  StyledVerticalMenu,
  StyledMenuIcon,
  StyledTop,
  StyledSeparator,
  StyledBottom,
  StyledRoundedImg,
  StyledDivider,
} from './styles';

const VerticalMenu = () => {
  const { profilePicture } = useSelector((state) => state.userReducer.present);
  const { isConnected } = useSelector((state) => state.twitterReducer);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const dispatch = useDispatch();
  const handleLogout = () => {
    localStorage.clear();
    dispatch(logoutUser());
  };

  return (
    <StyledVerticalMenu className="vertical-menu">
      <StyledTop className="top">
        <StyledMenuIcon>
          <Link to="/dashboard">
            <img
              className="logo"
              src={Assets.Pictures.MarkLogo}
              alt="Mark Logo"
            />
          </Link>
        </StyledMenuIcon>
        <StyledSeparator />

        {isConnected ? (
          <VerticalMenuItem
            text="Create"
            offset={30}
            onClick={() => setIsModalOpen(true)}
          >
            <img src={Assets.Pictures.CreateIcon} alt="New Post" />
          </VerticalMenuItem>
        ) : null}
        <CreateTweet
          visible={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />

        <VerticalMenuItem text="Streams" offset={30}>
          <Link to="/dashboard">
            <img src={Assets.Pictures.StreamsIcon} alt="Streams" />
          </Link>
        </VerticalMenuItem>
      </StyledTop>
      <StyledBottom>
        <Popover
          content={
            <Card>
              <CardBody>
                <Link to="/settings">Settings</Link>
                <StyledDivider />
                <Link to="/" onClick={handleLogout}>
                  Logout
                </Link>
              </CardBody>
            </Card>
          }
        >
          <StyledMenuIcon>
            <StyledRoundedImg src={profilePicture} alt="Mark Logo" />
          </StyledMenuIcon>
        </Popover>
      </StyledBottom>
    </StyledVerticalMenu>
  );
};

export default VerticalMenu;
