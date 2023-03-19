import React from 'react';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import SocialBox from './SocialBox';

const accounts = [
  {
    id: 0,
    name: 'Twitter',
    icon: <TwitterIcon />,
    onClick: () => {
      window.open(
        '/twitter/connect',
        'popUpWindow',
        "height=500,width=400,left=100,top=100,resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=no,directories=no, status=yes'"
      );
    },
  },
  {
    id: 0,
    name: 'Facebook',
    icon: <FacebookIcon />,
    onClick: () => {
      window.open(
        '/facebook/connect',
        'popUpWindow',
        "height=500,width=400,left=100,top=100,resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=no,directories=no, status=yes'"
      );
    },
  },
];

const SupportedAccounts = () => {
  return (
    <>
      {accounts.map((account) => (
        <SocialBox
          key={account.id}
          onClick={account.onClick}
          name={account.name}
          icon={account.icon}
        />
      ))}
    </>
  );
};

export default SupportedAccounts;
