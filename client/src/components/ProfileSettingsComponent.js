import React, { useState } from 'react';
import axiosInstance from '../api/buildClient';

const ProfileSettingsComponent = ({ user }) => {
  const [fullName, setFullName] = useState(user.fullName);
  const [email, setEmail] = useState(user.email);
  const [avatar, setAvatar] = useState(
    user.profilePicture
      ? user.profilePicture
      : 'https://projectmarkbucket.s3.eu-west-3.amazonaws.com/default_profile.jpg'
  );
  const [selectedFile, setSelectedFile] = useState(null);
  const [errors, setErrors] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const submitChanges = async (e) => {
    e.preventDefault();
    const requestBody = {
      fullName,
      email: email !== user.email ? email : undefined,
      profilePicture:
        avatar ===
        'https://projectmarkbucket.s3.eu-west-3.amazonaws.com/default_profile.jpg'
          ? undefined
          : avatar,
    };
    try {
      const response = await axiosInstance.put(
        'api/user/currentuser',
        requestBody
      );

      if (response.status === 200) {
        // TODO update user state
        setSuccessMessage(
          <div className="alert alert-success ">
            Account saved successfully!
          </div>
        );
      }
    } catch (err) {
      setErrors(
        <div className="alert alert-danger">
          <ul>
            {err.response.data.errors.map((err) => (
              <li key={err.message}>{err.message}</li>
            ))}
          </ul>
        </div>
      );
    }
  };

  const fileOnChangeHandler = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    const data = new FormData();
    data.append('image', selectedFile);

    try {
      const response = await axiosInstance.post('/api/user/uploadimage', data);

      if (response.status === 200) {
        setAvatar(response.data.imageUrl);
      }
    } catch (err) {
      setErrors(
        <div className="alert alert-danger">
          <ul>
            {err.response.data.errors.map((err) => (
              <li key={err.message}>{err.message}</li>
            ))}
          </ul>
        </div>
      );
    }
  };

  return (
    <div className="card">
      <div className="card-header">Account info</div>
      <div className="card-body">
        <form onSubmit={submitChanges}>
          <div className="row">
            <div className="col-md-8">
              <div className="form-group">
                <label htmlFor="inputFullname">Full Name</label>
                <input
                  className="form-control"
                  id="inputFullname"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                ></input>
              </div>
              <div className="form-group">
                <label htmlFor="inputEmail">Email</label>
                <input
                  className="form-control"
                  id="inputEmail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                ></input>
              </div>
            </div>
            <div className="col-md-4">
              <div className="text-center">
                <img
                  style={{ width: 128, height: 128 }}
                  alt={fullName}
                  className="rounded-circle img-responsive my-2"
                  src={avatar}
                />

                <input
                  type="file"
                  className="form-control-file mb-2"
                  onChange={fileOnChangeHandler}
                />
                <button
                  type="button"
                  className="btn btn-primary mb-2"
                  onClick={handleUpload}
                >
                  Upload
                </button>
              </div>
            </div>
          </div>
          <button type="submit" className="btn btn-primary mb-2">
            Save Changes
          </button>
        </form>
        {errors}
        {successMessage}
      </div>
    </div>
  );
};

export default ProfileSettingsComponent;
