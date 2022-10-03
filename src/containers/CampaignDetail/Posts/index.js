import React from 'react';
import { useHistory } from 'react-router-dom';
import styles from './Post.module.scss';
import Post3 from '../../../assets/bottle.png';
import Post2 from '../../../assets/post2.png';
import Post1 from '../../../assets/post1.png';
import clsx from 'clsx';

const Posts = ({ width }) => {

    const history = useHistory();

    return (
        <div className={clsx(styles.postContainer, width ? styles.fullWidth : '')}>
            <h1>Posts</h1>
            <div className={styles.mainDiv}>
                <div className={styles.elemtdiv}>
                    <img alt="post1" src={Post1} />
                </div>
                <div className={styles.elemtdiv}>
                    <img alt="post2" src={Post2} />
                </div>
                <div className={styles.elemtdiv}>
                    <img alt="post3" src={Post3} />
                </div>
            </div>
            <button onClick={() => history.push('/posts')}>See all</button>
        </div>
    );
}

export default Posts;