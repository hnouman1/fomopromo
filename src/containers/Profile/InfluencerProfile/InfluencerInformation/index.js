import React, { useState } from 'react';
import { Edit, Phone } from 'react-feather';
import { InputAdornment, Grid, Avatar, Popover } from '@material-ui/core';
import styles from './InfluencerInformation.module.scss';
import moment from 'moment';
import clsx from 'clsx';
import SVG from 'react-inlinesvg';
import EditInfluencerInformation from './EditInfluencerInformation';

const Messages = () => {
  return (
    <span>
      <SVG src={require('../../../../assets/Messages.svg')} />
    </span>
  );
};
const Globe = () => {
  return (
    <span>
      <SVG src={require('../../../../assets/globe.svg')} />
    </span>
  );
};

const InfluencerInformation = ({ isOwner,
  name,
  handleName,
  age,
  handleAge,
  website,
  handleWebsite,
  phoneNumber,
  handlePhoneNumber,
  bio,
  handleBio,
  location,
  handleLocation,
  email,
  handleEmail,
  handleActiveSave,
  handleUpdate,
  activeSave,
  editOpen,
  setEditOpen,
  onCancel,
  errorMessage

}) => {

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div className={styles.influencerInfoContainer}>
      <div className={styles.headerContainer}>
        <h1>Influencer Information</h1>
        {isOwner ? (
          <Edit
          style={{cursor: "pointer"}}
            onClick={() => {
              setEditOpen(true);
              setAnchorEl(null);
            }}
          />
        ) : (
            ''
          )}
      </div>
      <EditInfluencerInformation
        name={name}
        handleName={handleName}
        age={age}
        handleAge={handleAge}
        website={website}
        handleWebsite={handleWebsite}
        phoneNumber={phoneNumber}
        handlePhoneNumber={handlePhoneNumber}
        bio={bio}
        handleBio={handleBio}
        location={location}
        handleLocation={handleLocation}
        email={email}
        handleEmail={handleEmail}
        handleActiveSave={handleActiveSave}
        handleUpdate={handleUpdate}
        activeSave={activeSave}
        errorMessage={errorMessage}
        open={editOpen}
        closeAdd={onCancel}
      />
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      ></Popover>
      <div className={styles.detailSubContent}>
        <p>
          {bio ? bio : 'Tell brands a little bit about yourself in your bio.'}
        </p>
      </div>
      <div className={styles.detailSubContent}>
        <div className={styles.svgContainer}>
          <Messages />
          <span style={{ marginLeft: '20px' }}>
            {' '}
            {email}{' '}
          </span>
        </div>
        <div className={styles.svgContainer}>
          <Globe />
          <span style={{ marginLeft: '20px' }}>{website}</span>
        </div>
        <div className={styles.svgContainer}>
          <Phone />
          <span style={{ marginLeft: '20px' }}> {phoneNumber} </span>
        </div>
      </div>
    </div>
  );
};

export default InfluencerInformation;
