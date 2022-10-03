import React from 'react';
import { Grid } from '@material-ui/core';
import styles from './RecentPosts.module.scss';
import Post2 from '../../../../assets/post1.png';
import Post1 from '../../../../assets/main.png';

const RecentPosts = () => {
  return (
    <div className={styles.postContainer}>
      <div className={styles.headingContainer}>
        <h1>Recent Posts</h1>
      </div>
      <Grid container spacing={1} item md={10}>
        <div className={styles.mainDiv}>
          <Grid item md={5}>
            <div className={styles.elemtdiv}>
              <img alt='post1' src={Post2} />
            </div>
          </Grid>
          <Grid item md={5}>
            <div className={styles.elemtdiv}>
              <img alt='post2' src={Post2} />
            </div>
          </Grid>

          <Grid item md={5}>
            <div className={styles.elemtdiv}>
              <img alt='post3' src={Post2} />
            </div>
          </Grid>

          <Grid item md={5}>
            <div className={styles.elemtdiv}>
              <img alt='post3' src={Post2} />
            </div>
          </Grid>

          <Grid item md={5}>
            <div className={styles.elemtdiv}>
              <img alt='post3' src={Post2} />
            </div>
          </Grid>
        </div>
      </Grid>
    </div>
  );
};
export default RecentPosts;
