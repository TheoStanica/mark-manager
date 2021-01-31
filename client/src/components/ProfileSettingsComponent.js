import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser, uploadPhoto } from '../redux/actions/userActions';
import { store } from '../redux/store';
import { ActionCreators } from 'redux-undo';
import ErrorDisplay from './DisplayErrors';
import DisplayUserMessages from './DisplayUserMessages';

const ProfileSettingsComponent = () => {
  const user = useSelector((state) => state.userReducer.present);
  const dispatch = useDispatch();

  const [editForm, setEditForm] = useState(false);
  const [fullName, setFullName] = useState(user.fullName);
  const [email, setEmail] = useState(user.email);
  const [profilePicture, setProfilePicture] = useState(user.profilePicture);
  const [selectedFile, setSelectedFile] = useState(null);
  const reduxUserStore = () => store.getState().userReducer.present;

  useEffect(() => {
    return store.subscribe(() => {
      setEmail(reduxUserStore().email);
      setFullName(reduxUserStore().fullName);
      setProfilePicture(reduxUserStore().profilePicture);
    });
  }, []);

  const submitChanges = async (e) => {
    e.preventDefault();
    dispatch(updateUser({ email, fullName, profilePicture }));
    setEditForm(!editForm);
  };

  const fileOnChangeHandler = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = () => {
    const data = new FormData();
    data.append('image', selectedFile);
    dispatch(uploadPhoto(data));
  };

  const cancelEdits = () => {
    setEditForm(!editForm);
    setEmail(user.email);
    setFullName(user.fullName);
    setProfilePicture(user.profilePicture);
    dispatch(ActionCreators.undo());
  };

  const renderButton = ({ text, className, type, onClick }) => {
    return (
      <button className={className} type={type} onClick={onClick}>
        {text}
      </button>
    );
  };

  const renderButtons = () => {
    if (!editForm) {
      return renderButton({
        text: 'Edit',
        className: 'btn btn-primary mb-2',
        onClick: () => setEditForm(!editForm),
      });
    }
    return (
      <div>
        {renderButton({
          text: 'Save Changes',
          className: 'btn btn-success mb-2 me-2',
          type: 'submit',
        })}
        {renderButton({
          text: 'Cancel',
          className: 'btn btn-danger mb-2',
          onClick: () => cancelEdits(),
        })}
      </div>
    );
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
                  minLength="4"
                  disabled={!editForm}
                ></input>
              </div>
              <div className="form-group">
                <label htmlFor="inputEmail">Email</label>
                <input
                  className="form-control"
                  id="inputEmail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={!editForm}
                ></input>
              </div>
            </div>
            <div className="col-md-4">
              <div className="text-center">
                <img
                  style={{ width: 128, height: 128 }}
                  alt={fullName}
                  className="rounded-circle img-responsive my-2"
                  src={profilePicture}
                />
                <input
                  type="file"
                  className={`form-control-file mb-2 ${
                    editForm ? '' : 'd-none'
                  }`}
                  onChange={fileOnChangeHandler}
                />
                <button
                  type="button"
                  className={`btn btn-primary mb-2 ${editForm ? '' : 'd-none'}`}
                  onClick={handleUpload}
                >
                  Upload
                </button>
              </div>
            </div>
          </div>
          {renderButtons()}
        </form>
        <ErrorDisplay />
        {/* {user.message} */}
        <DisplayUserMessages />
      </div>
    </div>
  );
};

export default ProfileSettingsComponent;
