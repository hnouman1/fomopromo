import React, { useEffect, useState, useContext } from 'react';
import { ChevronRight, Plus } from 'react-feather';
import { useHistory } from 'react-router-dom';
import styles from './Posts.module.scss';
import Post3 from '../../assets/bottle.png';
import Post2 from '../../assets/snapchat.png';
import Post1 from '../../assets/main.png';
import AddPost from './AddPost';
import { RootContext } from '../../context/RootContext';

const Posts = () => {

    const history = useHistory();
    const [addPost, setAddPost] = useState(false);
    const { activeCampaign } = useContext(RootContext);

    useEffect(() => {
        window.scrollTo(0, 0)
    }, []);

    return (<>
        <AddPost open={addPost} handleClose={() => setAddPost(false)} />
        <div className={styles.postsContainer}>
            <div className={styles.postHeadingContainer}>
                <div className={styles.postHeading}>
                    <span onClick={() => history.push('/campaigns')}>Campaigns</span>
                    <ChevronRight />
                    <span onClick={() => history.push(`/campaignDetail/${activeCampaign}`)}>Campaigns Name</span>
                    <ChevronRight />
                    <span>Posts</span>
                </div>
                <button onClick={() => setAddPost(true)} ><Plus />Upload Post</button>
            </div>
            <div className={styles.postsGrid}>
                <div className={styles.imageContainer}>
                    <div className={styles.elemtdiv}>
                        <img alt="post1" src={Post1} />
                    </div>
                    <p>Uploaded 10/3/2020</p>
                    <p className={styles.link}>
                        www.instagram.com/samozkural/4439405
                </p>
                </div>
                <div className={styles.imageContainer}>
                    <div className={styles.elemtdiv}>
                        <img alt="post1" src={Post2} />
                    </div>
                    <p>Uploaded 10/3/2020</p>
                    <p className={styles.link}>
                        www.instagram.com/samozkural/4439405
                </p>
                </div>
                <div className={styles.imageContainer}>
                    <div className={styles.elemtdiv}>
                        <img alt="post1" src={Post3} />
                    </div>
                    <p>Uploaded 10/3/2020</p>
                    <p className={styles.link}>
                        www.instagram.com/samozkural/4439405
                </p>
                </div>
                <div className={styles.imageContainer}>
                    <div className={styles.elemtdiv}>
                        <img alt="post1" src={Post1} />
                    </div>
                    <p>Uploaded 10/3/2020</p>
                    <p className={styles.link}>
                        www.instagram.com/samozkural/4439405
                </p>
                </div>
            </div>
            <div className={styles.postsGrid}>
                <div className={styles.imageContainer}>
                    <div className={styles.elemtdiv}>
                        <img alt="post1" src={Post1} />
                    </div>
                    <p>Uploaded 10/3/2020</p>
                    <p className={styles.link}>
                        www.instagram.com/samozkural/4439405
                </p>
                </div>
                <div className={styles.imageContainer}>
                    <div className={styles.elemtdiv}>
                        <img alt="post1" src={Post2} />
                    </div>
                    <p>Uploaded 10/3/2020</p>
                    <p className={styles.link}>
                        www.instagram.com/samozkural/4439405
                </p>
                </div>
            </div>
        </div>
    </>)
};

export default Posts;