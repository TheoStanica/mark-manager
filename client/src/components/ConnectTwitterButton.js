const ConnectTwitterButton = () => {
  const onClick = () => {
    window.open(
      '/twitter/connect',
      'popUpWindow',
      "height=500,width=400,left=100,top=100,resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=no,directories=no, status=yes'"
    );
  };
  return (
    <div className="btn btn-primary" onClick={onClick}>
      <i className="bi bi-twitter me-1"></i>
      Connect with Twitter
    </div>
  );
};

export default ConnectTwitterButton;
