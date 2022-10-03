import React, { useState, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import styles from './notifications.module.scss';
import SVG from 'react-inlinesvg';
import Popover from '@material-ui/core/Popover';
import { API } from 'aws-amplify';
import ShowNotification from './ShowNotification';
import * as moment from 'moment';
import * as _ from 'lodash';
import getNotificationsQuery from '../../GraphQL/getNotificationsQuery';

const NotificationIcon = () => {
  return <SVG src={require('../../assets/Notification.svg')} />;
};

const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const [displayNotifications, setDisplayNotifications] = useState([]);
  const [limit, setLimit] = useState(5);
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef && containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [displayNotifications]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    getNotifications();
  };

  const handleClose = () => {
    setNotifications([]);
    setDisplayNotifications([]);
    setLimit(5);
    setAnchorEl(null);
  };

  const getNotifications = async () => {
    try {
      const result = await getNotificationsQuery();
      if (result.error === false) {
        const not = _.cloneDeep(result.data);
        const nots = [...result.data];
        setNotifications(not);
        mapNotifications(nots.splice(0, limit));

      }
    } catch (e) {
      console.log('error in notifcations ', e);
    }
  };

  const handleLoadMore = () => {
    let nots = _.cloneDeep(notifications);
    mapNotifications(nots.splice(0, limit));
  };

  const mapNotifications = (noti) => {
    let copyNotifications = [...noti];
    copyNotifications = copyNotifications.map((notification) => {
      const today = moment().format('dddd');
      const yesterday = moment().subtract(1, 'days').format('dddd');

      if (today == moment(notification.received).format('dddd')) {
        notification.when = 'Today';
      } else if (yesterday == moment(notification.received).format('dddd')) {
        notification.when = 'Yesterday';
      } else {
        notification.when = moment(notification.received).format('dddd');
      }

      return notification;
    });
    setDisplayNotifications(
      Object.entries(_.groupBy(copyNotifications, 'when'))
    );
    setLimit((prev) => prev + 5);
  };

  return (
    <>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        PaperProps={{
          style: { width: '378px', height: '780px', marginTop: '22px' },
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <div className={styles.mainContainer} ref={containerRef}>
          <div className={styles.Heading}>
            <p>Notifications</p>
          </div>
          {displayNotifications &&
            displayNotifications !== null &&
            displayNotifications.length !== 0 &&
            displayNotifications.map((notif) => {
              return (
                <div className={styles.NotificationContainer}>
                  <div className={styles.notificationDay}>
                    <p>{notif[0]}</p>
                  </div>
                  <div className={styles.NotificationCardContainer}>
                    {notif[1].map((item) => (
                      <ShowNotification notifications={item} />
                    ))}
                  </div>
                </div>
              );
            })}
          {limit <= notifications.length ? (
            <div className={styles.loadMore}>
              <button onClick={handleLoadMore}>Load More</button>
            </div>
          ) : (
              ''
            )}
        </div>
      </Popover>
      <div onClick={handleClick}>
        <NotificationIcon />
      </div>
    </>
  );
};

export default Notification;
