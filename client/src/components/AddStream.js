import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addStream } from '../redux/actions/twitterActions';
import ClearButton from './ClearButton/ClearButton';
import ListItem from './ListItem/ListItem';
import ListMenu from './ListMenu/ListMenu';
import ListMenuHeader from './ListMenu/ListMenuHeader';
import Modal from './Modal/Modal';
import ModalBody from './Modal/ModalBody';
import ModalHeader from './Modal/ModalHeader';
import Popover from './Popover/Popover';

const AddStream = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();

  return (
    <>
      <Popover
        content={
          <ListMenu>
            <ListMenuHeader>Add Stream</ListMenuHeader>
            <ListItem
              text="Search"
              onClick={() => {
                setModalVisible(true);
              }}
            />
            <ListItem
              text="Home Timeline"
              onClick={() => {
                dispatch(addStream({ type: 'home_timeline' }));
              }}
            />
          </ListMenu>
        }
      >
        <ClearButton>Add Stream</ClearButton>
      </Popover>
      <Modal
        visible={modalVisible}
        onClose={() => {
          setModalVisible(false);
          setSearchTerm('');
        }}
        onSubmit={() => {
          dispatch(addStream({ type: 'search', search: searchTerm }));
          setModalVisible(false);
          setSearchTerm('');
        }}
      >
        <ModalHeader>Search Stream</ModalHeader>
        <ModalBody>
          <textarea
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
            style={{ minWidth: 400, maxHeight: 100 }}
          />
        </ModalBody>
      </Modal>
    </>
  );
};

export default AddStream;
