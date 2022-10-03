import React, { useState, useEffect } from 'react';
import { Grid, Select } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import SVG from 'react-inlinesvg';
import CreateCompensation from './CreateCompensation';
import AddIcon from '@material-ui/icons/Add';
import styles from './Compensations.module.scss';
import TextField from '../../../components/TextField';
import mainStyles from '../../../index.module.scss';

const Compensations = ({
	compensations,
	handleCompensations,
	handleCompensationValue,
	handleRemoveCompensation,
	handleActiveForCompensation,
	addAnother,

	compensationPayment,
	handleCompensationPayment,
	compensationProduct,
	handleCompensationProducts,
	compensationProductItems,
	handleCollectionExpand,
	compensationProducts,
	handleActiveForCompensationProduct,
	handleCompensationProductItem,
	giftCode,
	handleGiftCode,
	clearCollections,
	products
}) => {
	/**SVG */
	const Chevron = ({ Check, MenuId, ...other }) => {
		const onClick = () => {
			if (Check === "open") {
				setOpen(!open)
			}

		}
		return (
			<span onClick={onClick} {...other} className={styles.dropDownCustomizeSvg}>
				<SVG src={require('../../../assets/chevron-down.svg')} />
			</span>
		);
	};
	const [open, setOpen] = useState(false)
	const checkAddAnother = () => {
		if (addAnother === true) {
			setAnother(true);
		}
	};

	const [handleAnother, setAnother] = useState(false);




	useEffect(() => {
		checkAddAnother();
		handleActiveForCompensation();
	}, [compensations, compensationPayment]);

	useEffect(() => {
		clearCollections();
	}, [])

	return (
		<div>
			<Grid container spacing={3} style={{ paddingTop: "8px" }}>
				<Grid item xs={12}>
					<FormControl fullWidth variant='outlined'>
						<TextField
							labelid='demo-simple-select-outlined-label'
							id='demo-simple-select-outlined'
							label='Influencer payment schedule'
							fullWidth
							variant='outlined'
							className={mainStyles.placeholderColor}
							value={compensationPayment}
							onChange={(e) => {
								handleCompensationPayment(e.target.value);
							}}
							menuprops={{ variant: 'menu' }}
							select
							SelectProps={{ IconComponent: () => <Chevron MenuId="open" Check="open" />, open: open, onClose: () => { setOpen(false) }, onOpen: () => { setOpen(true) } }}
						>
							<MenuItem value='' disabled>
								{' '}
                Influencer payment schedule
              </MenuItem>
							<MenuItem value={'FIRST_OF_MONTH'}>
								1st of every month
              </MenuItem>
							<MenuItem value={'FIFTEENTH_OF_MONTH'}>
								15th of every month
              </MenuItem>
							<MenuItem value={'LAST_DAY_OF_MONTH'}>Last day of every month</MenuItem>
						</TextField>
					</FormControl>
				</Grid>
			</Grid>
			{compensations.map((item, index) => (
				<CreateCompensation
					giftCode={giftCode}
					handleGiftCode={handleGiftCode}
					item={item}
					key={index}
					compensations={compensations}
					index={index}
					handleCompensationValue={handleCompensationValue}
					handleRemoveCompensation={handleRemoveCompensation}
					handleAnother={() => setAnother(true)}
					compensationProduct={compensationProduct}
					handleCompensationProducts={handleCompensationProducts}
					compensationProductItems={compensationProductItems}
					compensationProducts={compensationProducts}
					handleActiveForCompensationProduct={
						handleActiveForCompensationProduct
					}
					handleCollectionExpand={handleCollectionExpand}
					handleCompensationProductItem={handleCompensationProductItem}
					products={products}
				/>
			))}
			{compensations.length > 0 && compensations.length !== 4 &&
				<button className={styles.addDeliverable} onClick={handleCompensations}>
					{' '}
					<AddIcon /> Add another compensation type
        </button>
			}
		</div>
	);
};

export default Compensations;
