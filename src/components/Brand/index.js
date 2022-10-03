import React from 'react';
import styles from './Brand.module.scss';
import logo from '../../assets/logo.png';

const Brand = () => {
	return (
		<div className={styles.brandContainter}>
			<a href="/">
				<img alt='Profile' src={logo} />
			</a>
		</div>
	);
};

export default Brand;
