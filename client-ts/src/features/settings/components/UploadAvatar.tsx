import { Avatar, IconButton, Input } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useCurrentUserQuery } from '../../../api/user';

interface Props {
  onImageUploaded: (file: File) => any;
}

const UploadAvatar = ({ onImageUploaded }: Props) => {
  const { data } = useCurrentUserQuery();
  const [imageLink, setImageLink] = useState(data?.user?.profilePicture);

  useEffect(() => {
    const avatar = data?.user?.profilePicture;
    if (avatar) {
      setImageLink(avatar);
    }
  }, [data]);

  const onImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }
    if (
      e?.target?.files[0] &&
      (e?.target?.files[0].type === 'image/jpeg' ||
        e?.target?.files[0].type === 'image/png')
    ) {
      const blob = new Blob([e.target.files[0]], { type: 'image/jpeg' });
      setImageLink(URL.createObjectURL(blob));
      onImageUploaded(e.target.files[0]);
    }
  };

  return (
    <>
      <Input
        inputProps={{ accept: 'image/*' }}
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
