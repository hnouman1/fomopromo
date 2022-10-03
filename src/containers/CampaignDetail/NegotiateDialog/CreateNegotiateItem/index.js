import React, { useState } from 'react';
import { Grid, InputAdornment, DialogTitle } from '@material-ui/core';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { Calendar } from 'react-feather';
import DateFnsUtils from '@date-io/date-fns';
import TextField from '../../../../components/TextField';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import styles from './CreateNegotiateItem.module.scss';
import clsx from 'clsx';
import SVG from 'react-inlinesvg';
import mainStyles from '../../../../index.module.scss';
import moment from 'moment'

const options = [];
for (let i = 1; i <= 20; i += 0.5) {
	options.push(i);
}

const CreateNegotiateItem = ({
	item,
	index,
	handleNegotiate,
	negotiables,
	startDateOpen,
	endDateOpen,
	handleStartDateOpen,
	handleEndDateOpen,
}) => {
	/**SVG */
	const Chevron = () => {
		return (
			<span className={styles.dropDownCustomizeSvg}>
				<SVG src={require('../../../../assets/chevron-down.svg')} />
			</span>
		);
	};

	const getContent = (option) => {
		return option.replace(/([A-Z])/g, ' $1').trim().toProperCase()
	};

	const handleCalenderOpen = (value, startDate) => {
		handleStartDateOpen(true)
	}
	return (
		<Grid container spacing={3}>
			<Grid
				item
				xs={12}
				className={clsx(
					styles.headerContainer,
					index > 0 ? styles.marginTop : ''
				)}
			>
				<DialogTitle className={styles.Heading} id='negotiate-dialog-title'>
					<p>item {index + 1} </p>
				</DialogTitle>
				{/* <p className={styles.headingColor}>Compensation Type </p>
				{compensations.length > 1 && (
					<Trash onClick={() => handleRemoveCompensation(index)} />
				)} */}
			</Grid>
			<Grid item xs={12} className={styles.marginbottomSelect}>
				<FormControl fullWidth variant='outlined'>
					<TextField
						id='Negotiate Item'
						fullWidth
						label='Negotiate Item'
						variant='outlined'
						className={mainStyles.placeholderColor}
						value={item.negotiateItem}
						onChange={(e) => {
							handleNegotiate(
								e.target.value,
								index,
								'Negotiate Item'
							);
						}}
						menuprops={{ variant: 'menu' }}
						select
						SelectProps={{ IconComponent: () => <Chevron /> }}
					>
						<MenuItem value='' disabled>
							Negotiate Item
            </MenuItem>
						{negotiables.map((option) => (
							<MenuItem key={option} value={option}>
								{getContent(option)}
							</MenuItem>
						))}
					</TextField>
				</FormControl>
			</Grid>

			{item.negotiateItem != "" ? (
				item.negotiateItem === 'revenueShare' ? (
					<Grid item xs={12} className={styles.marginbottomSelect}>
						<FormControl fullWidth variant='outlined'>
							<TextField
								id='revenue Share'
								fullWidth
								label='Revenue Share'
								variant='outlined'
								className={mainStyles.placeholderColor}
								value={item.negotiateValue}
								onChange={(e) => {
									handleNegotiate(
										e.target.value,
										index,
										'Negotiate Value'
									);
								}}
								menuprops={{ variant: 'menu' }}
								select
								SelectProps={{ IconComponent: () => <Chevron /> }}
							>
								<MenuItem value='' disabled>
									Negotiate Item
												</MenuItem>
								{options.map((option) => (
									<MenuItem key={option} value={option}>
										{option} %
									</MenuItem>
								))}
							</TextField>
						</FormControl>
					</Grid>
				) : item.negotiateItem === 'campaignDuration' ? (
					<>
						<Grid item xs={12} sm={12} md={6}>
							<TextField
								id='outlined-basic'
								fullWidth
								value={item.negotiateStartDate}
								onChange={(e) => {
									handleNegotiate(
										e.target.value,
										index,
										'Negotiate StartDate'
									);
								}}
								label='Start Date'
								className={mainStyles.placeholderColor}
								variant='outlined'
								onBlur={() => {
								}}
								InputProps={{
									endAdornment: (
										<InputAdornment className={styles.inputendornment} position='end'>
											<Calendar onClick={() => handleStartDateOpen(true)} />
										</InputAdornment>
									),
								}}
							/>
							<MuiPickersUtilsProvider utils={DateFnsUtils}>
								<DatePicker
									className={styles.displayNone}
									open={startDateOpen}
									value={item.negotiateStartDate}
									disablePast={true}
									initialFocusedDate={moment().add(1, 'day')}
									onChange={handleNegotiate}
									allowKeyboardControl={true}
									orientation='landscape'
									openTo='date'
									format='MM/dd/yyyy'
									margin='normal'
									onBlur={() => {
									}}
									onClose={() => handleStartDateOpen(false)}

								/>
							</MuiPickersUtilsProvider>
						</Grid>


						<Grid item xs={12} sm={12} md={6}>
							<TextField
								id='outlined-basic'
								fullWidth
								value={item.negotiateEndDate}
								onChange={(e) => {
									handleNegotiate(
										e.target.value,
										index,
										'Negotiate EndDate'
									);
								}}
								label='End Date'
								className={mainStyles.placeholderColor}
								variant='outlined'
								onBlur={() => {
								}}
								InputProps={{
									endAdornment: (
										<InputAdornment className={styles.inputendornment} position='end'>
											<Calendar onClick={() => handleEndDateOpen(true)} />
										</InputAdornment>
									),
								}}
							/>
							<MuiPickersUtilsProvider utils={DateFnsUtils}>
								<DatePicker
									className={styles.displayNone}
									open={endDateOpen}
									value={item.negotiateEndDate}
									disablePast={true}
									onChange={handleNegotiate}
									allowKeyboardControl={true}
									orientation='landscape'
									openTo='date'
									format='MM/dd/yyyy'
									margin='normal'
									onBlur={() => {
									}}
									onClose={() => handleEndDateOpen(false)}

								/>
							</MuiPickersUtilsProvider>
						</Grid>
					</>
				) : (
							<Grid item xs={12} sm={12} md={12}>
								<FormControl fullWidth variant='outlined'>
									<TextField
										labelid='demo-simple-select-outlined-label'
										id='message'
										label='Enter Value '
										fullWidth
										variant='outlined'
										className={mainStyles.placeholderColor}
										value={item.negotiateValue}
										onChange={(e) =>
											handleNegotiate(e.target.value, index, 'Negotiate Value')
										}
										MenuProps={{ variant: 'menu' }}
									>
									</TextField>
								</FormControl >
							</Grid >
						)
			) : ('')}


		
		</Grid >
	);
};

export default CreateNegotiateItem;
