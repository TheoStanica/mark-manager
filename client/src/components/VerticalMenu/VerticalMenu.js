import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logoutUser } from '../../redux/actions/userActions';
import Card from '../Card/Card';
import CardBody from '../Card/CardBody';
import CreateTweet from '../CreateTweet/CreateTweet';
import Popover from '../Popover/Popover';
import './VerticalMenu.css';
import VerticalMenuItem from './VerticalMenu.Item';
import { Assets } from '../../assets';

const VerticalMenu = () => {
  const { profilePicture } = useSelector((state) => state.userReducer.present);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const dispatch = useDispatch();
  const handleLogout = () => {
    localStorage.clear();
    dispatch(logoutUser());
  };

  return (
    <div className="vertical-menu">
      <div className="top">
        <div className="menu-icon">
          <Link to="/dashboard">
            <img
              className="logo"
              src={Assets.Pictures.MarkLogo}
              alt="Mark Logo"
            />
          </Link>
        </div>
        <div className="menu-separator"></div>
        <VerticalMenuItem
          text="Create"
          offset={30}
          onClick={() => setIsModalOpen(true)}
        >
          <img src={Assets.Pictures.CreateIcon} alt="New Post" />
        </VerticalMenuItem>

        <CreateTweet
          visible={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />

        <VerticalMenuItem text="Streams" offset={30}>
          <Link to="/dashboard">
            <img src={Assets.Pictures.StreamsIcon} alt="Streams" />
          </Link>
        </VerticalMenuItem>
      </div>
      <div className="bottom">
        <Popover
          content={
            <Card>
              <CardBody>
                <Link to="/settings">Settings</Link>
                <div className="divider mt-05 mb-05"></div>
                <Link to="/" onClick={handleLogout}>
                  Logout
                </Link>
              </CardBody>
            </Card>
          }
        >
          <div className="menu-icon">
            <img
              className="profile-icon"
              src={profilePicture}
              alt="Mark Logo"
            />
          </div>
        </Popover>
      </div>
    </div>
  );
};

export default VerticalMenu;
