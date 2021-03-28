import ClearButton from './ClearButton/ClearButton';

const ConnectTwitterButton = () => {
  const onClick = () => {
    window.open(
      '/twitter/connect',
      'popUpWindow',
      "height=500,width=400,left=100,top=100,resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=no,directories=no, status=yes'"
    );
  };
  return <ClearButton onClick={onClick}>Connect Twitter Account</ClearButton>;
};

export default ConnectTwitterButton;
