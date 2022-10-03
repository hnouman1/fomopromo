import React, { useState, useContext } from 'react';
import { RootContext } from '../../context/RootContext';
import { Auth } from 'aws-amplify';
import { Button, Grid, InputAdornment } from '@material-ui/core';
import TextField from '../../components/TextField';
import styles from './Signup.module.scss';
import mainStyles from './../../index.module.scss';
import SVG from 'react-inlinesvg';
import { useHistory } from 'react-router-dom';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import FacebookSVG from '../../assets/facebook-logo-2019-thumb.png';
import GoogleSVG from '../../assets/google-logo-icon-png-transparent-background-osteopathy-16.png';
import AppleSVG from '../../assets/apple-logo-png-index-content-uploads-10.png';
import { Link } from 'react-router-dom';

const Eye_offSVG = () => {
  return <SVG src={require('../../assets/eye-off.svg')} />;
};

const EyeSVG = () => {
  return <SVG src={require('../../assets/eye.svg')} />;
};

const Signup = () => {
/*accessing root context variables*/
  const {
    currentUser,                    /*currentUser {object} contains the information about current user*/ 
    setCurrentUser,                /*setCurrentUser {function} to set the value of currentUser object*/ 
    logoutMessage,                /*logoutMessage {string} contain the logout message*/ 
    setLogoutMessage,            /*setLogoutMessage {function} to set the vlaue of logoutMassage*/ 
    setShowLoader,              /*{bool} used to show the loader on the screen*/                          

  } = useContext(RootContext);
/*Variables used in this component*/
  const [passwordShown, setPasswordShown] = useState(false);          /*{bool} used to hide and show the password*/
  const [name, setFullname] = useState('');                          /*{string} to store the name of the user*/
  const [username, setEmail] = useState('');                        /*{string} to store the username(email) of the user*/
  const [password, setPassword] = useState('');                    /*{string} to store the password of the user*/
  const [errorMessage, setErrorMessage] = useState('');           /*{string} to store the error massage*/
  const [errorState, setErrorState] = useState(false);           /*{bool} to check if error state is occured*/
  
  const history = useHistory();

/*togglePasswordVisiblity {function} get called when
  eye icon is clicked on signup page used to show,hide password*/ 
  const togglePasswordVisiblity = () => {      
    setPasswordShown(passwordShown ? false : true);
  };
console.log("",)
/*onSignup {function} get called when clicking on sign up button*/

  const onSignup = async () => {
    try {
      if (terms === true) {
        setShowLoader(true);
        const user = await Auth.signUp({
          username,
          password,
          attributes: { name },
        });
        const loggedInUser = await Auth.signIn(username, password);
        setCurrentUser(loggedInUser);
        setErrorState(false);
        setLogoutMessage('');
        setErrorMessage('');
        setShowLoader(false);
        history.push('/onboarding');                                 /* pushing url to the address bar*/
      } else {
        setErrorMessage('Terms and conditions');
        setErrorState(true);
      }
    } catch (e) {
      setErrorMessage(e.message);
      setErrorState(true);
      setLogoutMessage('');
      setShowLoader(false);
    }
  };
/*handling terms and condtion of the sgin up page*/
  const [terms, setTerms] = useState(false);
  const handleTerms = () => {
    setTerms(terms ? false : true);
  };
  return (
    <div className={styles.signupContainer}>
      <h1 className={styles.heading}>Sign Up</h1>
      <TextField
        id='outlined-basic'
        label='Full Name'
        onChange={(e) => setFullname(e.target.value)}               /*setting name of the user*/
        variant='outlined'
        type='text'
      />
      <TextField
        id='outlined-basic'
        label='Email'
        onChange={(e) => setEmail(e.target.value)}                /*setting username of the user*/
        variant='outlined'
        type='text'
      />
      <TextField
        id='outlined-basic'
        label='Create Password'
        onChange={(e) => setPassword(e.target.value)}             /*setting password of the user*/
        variant='outlined'
        type={passwordShown ? 'text' : 'password'}
        InputProps={{                                            /*adding eye icon inside the text field using input props*/
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
                    <Eye_offSVG />{' '}
                  </div>
                )}
              </span>
            </InputAdornment>
          ),
        }}
      />

      <Grid container alignItems='center'>
        <Grid item xs={1} className={styles.optionsItem}>
          {terms ? (
            <span>
              <CheckCircleIcon onClick={handleTerms} />     
            </span>
          ) : (
            <span>
              <RadioButtonUncheckedIcon
                onClick={handleTerms}
                className={styles.svgDisabled}
              />
            </span>
          )}
        </Grid>
        <Grid item xs={10}>
          <p className={styles.textStyle1}>
            I agree to the <Link to='#'>Terms of Service</Link> and{' '}
            <Link to='#'>Privacy Policy</Link>
          </p>
        </Grid>
      </Grid>
      <div className={styles.actionsContainer}>
        <Button
          onClick={onSignup}
          className={mainStyles.defaultButton}
          variant='contained'
        >
          Sign up
        </Button>
        <Button
          onClick={() => {
            history.push('/login');             /* pushing url to the address bar*/
          }}
          className={mainStyles.defaultOutlinedButton}
          variant='outlined'
        >
          Login
        </Button>
      </div>
      <Grid item xs={10}>
        <p className={styles.errorText}>{errorState ? errorMessage : ' '}</p>
      </Grid>

      <div>
        <div className={styles.line}>
          <div className={styles.line2}> </div>
          <div className={styles.lineText}> or continue with</div>
          <div className={styles.line2}></div>
        </div>
        <div className={styles.socialContainers}>
          <div>
            <img className={styles.logoDiv} src={GoogleSVG} alt='Google' />
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

export default Signup;
