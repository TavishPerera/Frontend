import React from "react";

const LoginPage = () => {

  const openCognitoLogin = () => {
    window.open('https://inspireai.auth.us-east-1.amazoncognito.com/oauth2/authorize?client_id=38vlaj528ei4s75kamm22h25n7&response_type=code&scope=openid&redirect_uri=http%3A%2F%2F52.91.190.158%3A5050%2Fquotes', '_blank');
  };

  const pageStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '95vh',
    flexDirection: 'column',
    backgroundColor: '#f0f2f5',
    fontFamily: 'Arial, sans-serif',
    border: '10px solid #007bff', // Adding border
    borderRadius: '10px', // Adding border radius
    padding: '20px', // Adding padding
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Adding box shadow
  };

  const buttonStyle = {
    padding: '10px 20px',
    fontSize: '16px',
    color: 'white',
    backgroundColor: '#007bff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    outline: 'none',
  };

  const textStyle = {
    marginBottom: '20px',
    fontSize: '24px',
    color: '#333',
    fontFamily: 'Arial, sans-serif', // Adding font family
  };

  return (
    <div style={pageStyle}>
      <div style={textStyle}>Welcome to the Inspire AI Quotes App</div> {/* Updated text */}
      <div style={{ marginBottom: '30px', fontSize: '16px', color: '#666' }}>Sign in to continue</div> {/* Added extra text */}
      <button onClick={openCognitoLogin} style={buttonStyle}>Login with AWS Cognito</button>
    </div>
  );
};

export default LoginPage;
