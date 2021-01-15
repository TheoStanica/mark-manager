import React from 'react';

const PasswordSettingsComponent = () => {
  return (
    <div className="card">
      <div className="card-header">Change Password</div>
      <div className="card-body">
        <form>
          <div className="row">
            <div className="col">
              <div className="form-group">
                <label htmlFor="inputFullname">Old Password</label>
                <input className="form-control" id="inputOldPassword"></input>
              </div>
              <div className="form-group">
                <label htmlFor="inputNewPassword">New Password</label>
                <input className="form-control" id="inputNewPassword"></input>
              </div>
              <div className="form-group">
                <label htmlFor="inputRepeatNewPassword">
                  Repeat New Password
                </label>
                <input
                  className="form-control"
                  id="inputRepeatNewPassword"
                ></input>
              </div>
            </div>
          </div>
          <button type="submit" className="btn btn-primary mb-2">
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default PasswordSettingsComponent;
