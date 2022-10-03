import React, { useState } from 'react';
import styles from './NegotiateDialog.module.scss';
import TextField from '../../../components/TextField';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import SVG from 'react-inlinesvg';
import { Plus } from 'react-feather';
import CreateNegotiateItem from './CreateNegotiateItem'
import {
	Grid,
	Avatar,
	Popover,
	Checkbox,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
} from "@material-ui/core";

const Chevron = () => {
	return (
		<span className={styles.dropDownCustomizeSvg}>
			<SVG src={require('../../../assets/chevron-down.svg')} />
		</span>
	);
};

/*Svg*/
const ChevronSVG = () => {
	return <SVG src={require('../../../assets/chevron-left.svg')} />;
};
const options = [];
for (let i = 1; i <= 20; i += 0.5) {
	options.push(i);
}



const NegotiateDialog = ({
	open,
	openDialog,
	negotiables,
	handleClose,
	negotiate,
	handleNegotiate,
	handleAnotherItem,
	negotiateCampaign,
	startDateOpen,
	endDateOpen,
	handleStartDateOpen,
	handleEndDateOpen,
	errorMessage,
}) => {

	const handleNext = () => {
		handleClose();
		setMessageDialog(true)
	}
	const handleBack = () => {
		setMessageDialog(false);
		openDialog();
	}

	const [messageDialog, setMessageDialog] = useState('');

	return (
		<>
			<Dialog
				classes={{ paper: styles.negotiate }}
				aria-labelledby='confirmation-dialog-title'
				open={open}
				onClose={handleClose}
			>
				<DialogTitle
					className={styles.dialogTitle}
					id="decline-dialog-title"
				>
					<p className={styles.headingTitleText}> Negotiate
					</p>

				</DialogTitle>
				{negotiate.map((item, index) => (
					<CreateNegotiateItem
						item={item}
						key={index}
						negotiate={negotiate}
						index={index}
						negotiables={negotiables}
						handleNegotiate={handleNegotiate}
						startDateOpen={startDateOpen}
						endDateOpen={endDateOpen}
						handleStartDateOpen={handleStartDateOpen}
						handleEndDateOpen={handleEndDateOpen}
					/>
				))}
				<div className={styles.addMore} onClick={handleAnotherItem}>
					<Plus />
					<p>Negotiate another item</p>
				</div>
				<div className={styles.footer}>
					<span onClick={handleClose}>Cancel</span>
					<button
						onClick={() => {
							handleNext()
						}}
					>
						Next
				</button>
				</div>
			</Dialog>

			<Dialog
				disableBackdropClick
				disableEscapeKeyDown
				aria-labelledby="Decline Dialog"
				open={messageDialog}
				classes={{ paper: styles.negotiateMessage }}
			>
				<DialogTitle
					className={styles.dialogTitle}
					id="decline-dialog-title"
				>
					<span className={styles.negotiateMessageHeading} onClick={handleBack}>
						<ChevronSVG />
						<p className={styles.titleText}> Negotiate
					</p>
					</span>

				</DialogTitle>
				<DialogContent className={styles.dialogContent}>
					<Grid item xs={12} sm={12} md={12}>
						<FormControl fullWidth variant='outlined' >
							<TextField
								labelid='demo-simple-select-outlined-label'
								id='message'
								label='Enter Custom Message'
								fullWidth
								rows={10}
								multiline={true}
								variant='outlined'
								className={styles.messageField}
								value={negotiate[0].negotiateMessage}
								onChange={(e) =>
									handleNegotiate(e.target.value, 0, 'Negotiate Message')
								}
								MenuProps={{ variant: 'menu' }}
							>
							</TextField>
						</FormControl>
					</Grid>
				</DialogContent>
				<DialogActions className={styles.dialogActions}>
					<div className={styles.footer}>
						<span onClick={() => setMessageDialog(false)}>Cancel</span>
						<button
							onClick={() => negotiateCampaign()}
						>
							Send to Brand
						</button>
					</div>
				</DialogActions>
				<div>
					{errorMessage !== '' && <div style={{color: 'red'}}>{errorMessage}</div>}
				</div>
			</Dialog>
		</>

	);
};

export default NegotiateDialog;
