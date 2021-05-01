import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logoutUser } from '../../redux/actions/userActions';
import Card from '../Card/Card';
import CardBody from '../Card/CardBody';
import CreateTweet from '../CreateTweet/CreateTweet';
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
import Logo from '../../assets/Pictures/Logo';
import CustomPopper from '../CustomPopper/CustomPopper';
import ThemeController from '../ThemeController/ThemeController';

const VerticalMenu = () => {
  const { profilePicture } = useSelector((state) => state.userReducer.present);
  const { twitterAccounts } = useSelector((state) => state.twitterReducer);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);

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
            <Logo size={44} />
          </Link>
        </StyledMenuIcon>
        <StyledSeparator />

        {twitterAccounts?.length > 0 ? (
          <VerticalMenuItem
            text="Create"
            offset={[0, 25]}
            onClick={() => setIsModalOpen(true)}
          >
            <img src={Assets.Pictures.CreateIcon} alt="New Post" />
          </VerticalMenuItem>
        ) : null}
        <CreateTweet
          visible={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />

        <VerticalMenuItem text="Streams" offset={[0, 25]}>
          <Link to="/dashboard">
            <img src={Assets.Pictures.StreamsIcon} alt="Streams" />
          </Link>
        </VerticalMenuItem>
      </StyledTop>
      <StyledBottom>
        <ThemeController />
        <CustomPopper
          open={isAccountMenuOpen}
          placement="top-start"
          popper={
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
          <StyledMenuIcon
            onClick={() => setIsAccountMenuOpen(!isAccountMenuOpen)}
          >
            <StyledRoundedImg src={profilePicture} alt="Mark Logo" />
          </StyledMenuIcon>
        </CustomPopper>
      </StyledBottom>
    </StyledVerticalMenu>
  );
};

export default VerticalMenu;
