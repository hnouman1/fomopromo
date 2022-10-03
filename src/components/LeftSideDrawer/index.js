import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import ListItem from './ListItem';
import SVG from 'react-inlinesvg';
import { RootContext } from './../../context/RootContext';
import styles from './LeftSide.module.scss';
import { Users, Mail, Briefcase, Settings } from 'react-feather';

/**SVG Functions */
const IconProspects = () => {
	return <SVG src={require('../../assets/Prospects.svg')} />;
};
const IconCampaign = () => {
	return <SVG src={require('../../assets/Campaigns.svg')} />;
};

const IconReports = () => {
	return <SVG src={require('../../assets/Reports.svg')} />;
};

const IconWallet = () => {
	return <SVG src={require('../../assets/Wallet.svg')} />;
};
const IconBriefcase = () => {
	return <SVG src={require('../../assets/briefcase.svg')} />;
}
const IconSettings = () => {
	return <SVG src={require('../../assets/settings.svg')} />;
}
const IconBilling = () => {
	return <SVG src={require('../../assets/credit-card.svg')} />;
}

/**main component start from here */
const LeftSideDrawer = () => {
	/**rootContext variables*/
	const history = useHistory();
	const { activeRoute, setActiveRoute } = useContext(RootContext);

	return (
		<>
			<ListItem
				className={styles.listItem}
				icon={<IconCampaign />}
				active={activeRoute === 'Campaign' ? true : false}
				title={'Campaigns'}
				onClick={() => {
					setActiveRoute('Campaign');
					history.push('/campaigns');
				}}
			/>
			{/*
<ListItem
icon={<IconProspects />}
active={activeRoute === 'Prospects' ? true : false}
title={'Prospects'}
onClick={() => setActiveRoute('Prospects')}
/> */}

			<ListItem
				icon={<IconReports />}
				active={activeRoute === 'Reports' ? true : false}
				title={'Reports'}
				onClick={() => {
					setActiveRoute('Reports');
					history.push('/reports');
				}}
			/>

			<ListItem
				icon={<Mail />}
				active={activeRoute === 'Messages' ? true : false}
				onClick={() => {
					setActiveRoute('Messages');
					history.push('/messages');
				}}
				title={'Messages'}
			/>

			<ListItem
				icon={<Briefcase />}
				active={activeRoute === 'Relationships' ? true : false}
				onClick={() => {
					setActiveRoute('Relationships');
					history.push('/relationships');
				}}
				title={'Relationships'}
			/>
			<ListItem
				icon={<Users />}
				active={activeRoute === 'Team' ? true : false}
				onClick={() => {
					setActiveRoute('Team');
					history.push('/team');
				}}
				title={'Team'}
			/>
			<ListItem
				icon={<Settings />}
				active={activeRoute === 'Settings' ? true : false}
				onClick={() => {
					setActiveRoute('Settings');
					history.push('/settings');
				}}
				title={'Settings'}
			/>
			<ListItem
				icon={<IconBilling />}
				active={activeRoute === 'AccountHistory' ? true : false}
				onClick={() => {
					setActiveRoute('AccountHistory');
					history.push('/billing');
				}}
				title={'Billing'}
			/>
		</>
	);
};

export default LeftSideDrawer;