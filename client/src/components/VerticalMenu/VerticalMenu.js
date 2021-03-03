import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logoutUser } from '../../redux/actions/userActions';
import Modal from '../Modal/Modal';
import ModalBody from '../Modal/Modal.Body';
import ModalHeader from '../Modal/Modal.Header';
import './VerticalMenu.css';
import VerticalMenuItem from './VerticalMenu.Item';

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
            <img className="logo" src="./MarkLogo.svg" alt="Mark Logo" />
          </Link>
        </div>
        <div className="menu-separator"></div>
        <VerticalMenuItem
          text="Create"
          offset={30}
          onClick={() => setIsModalOpen(true)}
        >
          <img src="./CreateIcon.svg" alt="New Post" />
        </VerticalMenuItem>

        <Modal
          visible={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={() => console.log('submitting form')}
        >
          <ModalHeader>Create New Tweet</ModalHeader>
          <ModalBody>
            <textarea
              style={{
                width: '100%',
                minWidth: 600,
                height: 180,
                borderRadius: 5,
              }}
            />
          </ModalBody>
        </Modal>

        <VerticalMenuItem text="Streams" offset={30}>
          <Link to="/dashboard">
            <img src="./StreamsIcon.svg" alt="Streams" />
          </Link>
        </VerticalMenuItem>
      </div>
      <div className="bottom">
        <div
          onClick={handleLogout}
          style={{ fontSize: '.9rem', cursor: 'pointer' }}
        >
          Logout
        </div>
        <div className="menu-icon">
          <Link to="/settings">
            <img
              className="profile-icon"
              src={profilePicture}
              alt="Mark Logo"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VerticalMenu;
