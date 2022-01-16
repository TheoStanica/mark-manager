import { Avatar, IconButton, Input } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useCurrentUserQuery } from '../../../api/user/api';

const UploadAvatar = ({ onImageUploaded }) => {
  const { data } = useCurrentUserQuery();
  const [imageLink, setImageLink] = useState(data?.user?.profilePicture);

  useEffect(() => {
    const avatar = data?.user?.profilePicture;
    if (avatar) {
      setImageLink(avatar);
    }
  }, [data]);

  const onImageUpload = (e) => {
    if (e?.target?.files[0] && e?.target?.files[0].type === 'image/jpeg') {
      const blob = new Blob([e.target.files[0]], { type: 'image/jpeg' });
      setImageLink(URL.createObjectURL(blob));
      onImageUploaded(e.target.files[0]);
    }
  };

  return (
    <>
      <Input
        accept="image/*"
        id="contained-button-file"
        type="file"
        sx={{ display: 'none' }}
        onChange={onImageUpload}
      />
      <label htmlFor="contained-button-file">
        <IconButton component="span" aria-label="upload avatar">
          <Avatar
            sx={{ width: 150, height: 150, margin: 3 }}
            src={imageLink}
            alt="Avatar"
          />
        </IconButton>
      </label>
    </>
  );
};

export default UploadAvatar;
