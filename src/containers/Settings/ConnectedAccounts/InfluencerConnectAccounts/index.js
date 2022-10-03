import React, { useState } from 'react';
import styles from './InfluencerConnectAccounts.module.scss';
import SVG from 'react-inlinesvg';
import { InputAdornment } from '@material-ui/core';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ChipButton from '../../../../components/ChipButton';
import TextField from '../../../../components/TextField';

const Facebook = () => {
  return <SVG src={require('../../../../assets/facebook1.svg')} />;
};
const Instagram = () => {
  return <SVG src={require('../../../../assets/instagram1.svg')} />;
};
const Youtube = () => {
  return <SVG src={require('../../../../assets/youtube1.svg')} />;
};
const Twitter = () => {
  return <SVG src={require('../../../../assets/twitter1.svg')} />;
};
const Tiktok = () => {
  return <SVG src={require('../../../../assets/tiktok1.svg')} />;
};
const Twitch = () => {
  return <SVG src={require('../../../../assets/twitch1.svg')} />;
};

const accounts = [
  {
    id: 1,
    svg: <Instagram />,
    name: 'Instagram',
    placeholder: 'Instagram Handle',
    connected: false,
    value: '',
  },
];

const InfluencerConnectAccounts = () => {
  const [socialAccounts, setSocialAccounts] = useState(accounts);

  const handleButtonClick = (account) => {
    account.connected = !account.connected;
    let accounts = [...socialAccounts];
    accounts = accounts.map((acc) => {
      if (acc.id === account.id) {
        acc = account;
      }
      return acc;
    });
    setSocialAccounts(accounts);
  };

  const handleNameChange = (value, account) => {
    account.value = value;
    let accounts = [...socialAccounts];
    accounts = accounts.map((acc) => {
      if (acc.id === account.id) {
        acc = account;
      }
      return acc;
    });
    setSocialAccounts(accounts);
  };

  return (
    <div className={styles.mainContainer}>
      <h5>
        Connecting your social accounts allows us to populate your profile,
        making you a more attractive candidate for brand campaigns
      </h5>
      <div className={styles.influencerSocialAccountsContainer}>
        {socialAccounts.map((account) => {
          return (
            <div className={styles.influencerSocialAccountItem} style={{ marginTop: "25px" }}>
              <p className={styles.title}>{account.name}</p>
              <div className={styles.contentContainer}>
                <div>{account.svg}</div>
                <TextField
                  className={styles.inputField}
                  id='outlined-basic'
                  label={account.placeholder}
                  variant={account.connected ? 'filled' : 'outlined'}
                  value={account.value}
                  onChange={(e) => {
                    handleNameChange(e.target.value, account);
                  }}
                  disabled={account.connected ? true : false}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>
                        {account.connected ? (
                          <CheckCircleIcon
                            className={styles.inputendornmentCheck}
                          />
                        ) : (
                            ''
                          )}
                      </InputAdornment>
                    ),
                  }}
                />
                <ChipButton
                  title={account.connected ? 'Clear' : 'Connect'}
                  buttonSize={'sm'}
                  handleClick={() => handleButtonClick(account)}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default InfluencerConnectAccounts;
