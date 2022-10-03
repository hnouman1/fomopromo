import React from 'react';
import styles from './Auth.module.scss';
import logo from '../../assets/FomoPromo_logo__primary_color.png';
import mainImage from '../../assets/AdobeStock_242493025_Preview.png';

const Auth = ({ children, image }) => {
	return (
		<main className={styles.authContainer}>
			<section className={styles.logoAndComponent}>
				<img className={styles.logoDiv} src={logo} alt='Logo' />
				<div className={styles.formDiv}>{children}</div>
			</section>
			<section className={styles.sidebar}>
				<div className="after">
					<img src={image} alt='Logo' />
				</div>
			</section>
		</main>
	);
};

export default Auth;
