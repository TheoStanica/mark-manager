import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../../redux/actions/userActions';
import ErrorDisplay from '../DisplayErrors';
import DisplayUserMessages from '../DisplayUserMessages';
import Card from '../Card/Card';
import CardHeader from '../Card/Card.Header';
import CardBody from '../Card/Card.Body';
import './ProfileSettings.css';
import InputField from '../InputField/InputField';
import Button from '../Button/Button';

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
    <Card className="w-100">
      <CardHeader className="no-border">Account info</CardHeader>
      <CardBody>
        <form onSubmit={submitChanges}>
          <div className="edit">
            <div className="p-info mr-1">
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
            </div>
            <div className="p-avatar mb-1">
              <img alt={fullName} className="mb-1" src={profilePicture} />
              <InputField
                type="file"
                id="upload-avatar"
                text="Upload"
                onChange={fileOnChangeHandler}
              />
            </div>
          </div>
          <Button type="submit">Save Changes</Button>
        </form>
        <ErrorDisplay />
        <DisplayUserMessages />
      </CardBody>
    </Card>
  );
};

export default ProfileSettingsComponent;
