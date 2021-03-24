import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../../redux/actions/userActions';
import ErrorDisplay from '../DisplayErrors';
import DisplayUserMessages from '../DisplayUserMessages';
import Card from '../Card/Card';
import CardHeader from '../Card/CardHeader';
import CardBody from '../Card/CardBody';
import InputField from '../InputField/InputField';
import Button from '../Button/Button';
import { StyledAvatar, StyledEdit, StyledInfo } from './styles';

const ProfileSettingsComponent = () => {
  const user = useSelector((state) => state.userReducer.present);
  const dispatch = useDispatch();
  const [fullName, setFullName] = useState(user.fullName);
  const [email, setEmail] = useState(user.email);
  const [profilePicture, setProfilePicture] = useState(user.profilePicture);
  const [selectedFile, setSelectedFile] = useState(null);

  const submitChanges = async (e) => {
    e.preventDefault();
    if (selectedFile) {
      const data = new FormData();
      data.append('image', selectedFile);
      dispatch(updateUser({ email, fullName, imgData: data }));
    } else {
      dispatch(updateUser({ email, fullName }));
    }
  };

  const fileOnChangeHandler = (e) => {
    if (e.target.files[0]) {
      const blob = new Blob([e.target.files[0]], {
        type: 'image/jpeg',
      });
      setProfilePicture(URL.createObjectURL(blob));
      setSelectedFile(e.target.files[0]);
    }
  };

  return (
    <Card style={{ width: '100%' }}>
      <CardHeader>Account info</CardHeader>
      <CardBody>
        <form onSubmit={submitChanges}>
          <StyledEdit>
            <StyledInfo>
              <InputField
                id="inputFullname"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                label="Full Name"
              />
              <InputField
                id="inputEmail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                label="Email"
              />
            </StyledInfo>
            <StyledAvatar>
              <img alt={fullName} src={profilePicture} />
              <InputField
                type="file"
                id="upload-avatar"
                text="Upload"
                onChange={fileOnChangeHandler}
              />
            </StyledAvatar>
          </StyledEdit>
          <Button type="submit">Save Changes</Button>
        </form>
        <ErrorDisplay />
        <DisplayUserMessages />
      </CardBody>
    </Card>
  );
};

export default ProfileSettingsComponent;
