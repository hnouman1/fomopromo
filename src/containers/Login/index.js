import React, { useState, useContext, useEffect } from 'react';
import { API } from 'aws-amplify';
import { TextField, Button, InputAdornment } from '@material-ui/core';
import styles from './Login.module.scss';
import { RootContext } from '../../context/RootContext';
import { Auth, Hub } from 'aws-amplify';
import mainStyles from './../../index.module.scss';
import SVG from 'react-inlinesvg';
import { useHistory } from 'react-router-dom';
import FacebookSVG from '../../assets/facebook-logo-2019-thumb.png';
import GoogleSVG from '../../assets/google-logo-icon-png-transparent-background-osteopathy-16.png';
import AppleSVG from '../../assets/apple-logo-png-index-content-uploads-10.png';
import meQuery from '../../GraphQL/MeQuery';

/*SVG*/
const EyeOffSVG = () => {
  return <SVG src={require('../../assets/eye-off.svg')} />;
};
const EyeSVG = () => {
  return <SVG src={require('../../assets/eye.svg')} />;
};

const Login = () => {

  /*variables of this component*/
  const history = useHistory();
  const [passwordShown, setPasswordShown] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  /*accessing Root context variables*/
  const {
    setShowLoader,
    setCurrentUser,
    logoutMessage,
    setLogoutMessage,
    setActiveRoute,
  } = useContext(RootContext);

  useEffect(() => {
    Hub.listen('auth', async ({ payload: { event, data } }) => {
      switch (event) {
        case 'signIn':
          setShowLoader(true);
          getMeData();
          break;
        case 'signOut':
          return;
          break;
        case 'customOAuthState':
          return;
      }
    });
  }, []);



  /*togglePasswordVisiblity {function} get called when
  eye icon is clicked on signup page used to show,hide password*/
  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  /*checking if enter is pressed */
  const handleKeypress = (e) => {
    if (e.keyCode === 13) {
      onSignin();
    }
  };

  /*onSignin {function} get called when sign in button is pressed*/
  const onSignin = async () => {
    setShowLoader(true);
    try {
      const user = await Auth.signIn(email, password); //authentication

      setCurrentUser(user);
      setLogoutMessage('');
      setActiveRoute('Campaign');
    } catch (e) {
      setErrorMessage(e.message);
      setLogoutMessage('');
      setShowLoader(false);
    }
  };

  const googleSignin = async () => {
    setShowLoader(true);
    try {
      await Auth.federatedSignIn({ provider: 'Google' });
    } catch (e) { }
  };


  /*getMeData{function} to get the user data by calling API and storing the response  to meData variable*/
  const getMeData = async () => {
    try {
      const mydata = await meQuery();
      const user = await Auth.currentAuthenticatedUser();
      setShowLoader(false);
      if (
        mydata &&
        mydata.data &&
        mydata.data.organizations &&
        mydata.data.organizations.length
      ) {
        setCurrentUser(user);
        setActiveRoute('Campaign');
      } else {
        setCurrentUser(user);
        history.push('/onboarding');
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className={styles.signinContainer}>
      <h1 className={styles.heading}>Login</h1>
      <TextField
        id='outlined-basic-email'
        onChange={(e) => setEmail(e.target.value)}
        label='Email'
        onKeyDown={handleKeypress}
        variant='outlined'
        type='text'
      />
      <TextField
        id='outlined-basic-password'
        onChange={(e) => setPassword(e.target.value)}
        label='Password'
        variant='outlined'
        onKeyDown={handleKeypress}
        type={passwordShown ? 'text' : 'password'}
        InputProps={{
          endAdornment: (
            <InputAdornment className={styles.inputendornment} position='end'>
              <span>
                {passwordShown ? (
                  <div onClick={togglePasswordVisiblity}>
                    {' '}
                    <EyeSVG />{' '}
                  </div>
                ) : (
                    <div onClick={togglePasswordVisiblity}>
                      {' '}
                      <EyeOffSVG />{' '}
                    </div>
                  )}
              </span>
            </InputAdornment>
          ),
        }}
      />
      <a
        onClick={() => {
          history.push('/forgot-password');
        }}
      >
        Forgot Password?
      </a>
      <div className={styles.actionsContainer}>
        <Button
          className={mainStyles.defaultButton}
          onClick={onSignin}
          variant='contained'
        >
          Login
        </Button>
        <Button
          onClick={() => {
            history.push('/signup');
          }}
          className={mainStyles.defaultOutlinedButton}
          variant='outlined'
        >
          Signup
        </Button>
      </div>
      {errorMessage !== '' ? (
        <p className={styles.error}>
          <i>{errorMessage}</i>
        </p>
      ) : null}
      {logoutMessage !== '' ? (
        <p className={styles.logOut}>
          <i>{logoutMessage}</i>
        </p>
      ) : null}
      <div>
        <div className={styles.line}>
          <div className={styles.line2}> </div>
          <div className={styles.lineText}> or continue with</div>
          <div className={styles.line2}></div>
        </div>
        <div className={styles.socialContainers}>
          <div>
            <img
              className={styles.logoDiv}
              src={GoogleSVG}
              alt='Google'
            />
          </div>
          <div>
            <img className={styles.logoDiv} src={FacebookSVG} alt='Facebook' />
          </div>
          <div>
            <img className={styles.logoDiv} src={AppleSVG} alt='Apple' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
