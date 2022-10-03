import React, { useState } from "react";
import { Grid, InputAdornment, DialogTitle } from "@material-ui/core";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { Calendar } from "react-feather";
import DateFnsUtils from "@date-io/date-fns";
import TextField from "../../../../components/TextField";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import styles from "./CreateNegotiateItem.module.scss";
import clsx from "clsx";
import SVG from "react-inlinesvg";
import mainStyles from "../../../../index.module.scss";
import moment from "moment";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";

const options = [];
for (let i = 1; i <= 20; i += 0.5) {
  options.push(i);
}

const CreateNegotiateItem = ({
  item,
  index,
  handleNegotiate,
  startDateOpen,
  endDateOpen,
  handleStartDateOpen,
  handleEndDateOpen,
  brandAcceptOffer,
}) => {
  /**SVG */
  const Chevron = () => {
    return (
      <span className={styles.dropDownCustomizeSvg}>
        <SVG src={require("../../../../assets/chevron-down.svg")} />
      </span>
    );
  };
  const getHeading = (value) => {
    switch (value) {
      case "postFee":
        return "Cash Per Post";
      case "revenueShare":
        return "Revenue Share";
      case "monthlyRetainerFee":
        return "Monthly Retainer Fee";
      case "giftCard":
        return "Gift Card";
    }
  };

  return (
    <Grid container spacing={3}>
      <Grid
        item
        xs={12}
        className={clsx(
          styles.headerContainer,
          index > 0 ? styles.marginTop : ""
        )}
      >
        <DialogTitle
          className={styles.Heading}
          style={index !== 0 ? { marginTop: "24px" } : {}}
          id="negotiate-dialog-title"
        >
          <p>
            Proposed {getHeading(item.negotiateItem)} : ${item.negotiateValue}
          </p>
        </DialogTitle>
      </Grid>
      <Grid item xs={12} className={styles.marginbottomSelect}>
        {item.accept ? (
          <CheckCircleIcon
            onClick={() => {
              handleNegotiate(!item.accept, index, "accept");
            }}
            style={{ width: "31px", height: "31px", color: "#7b5cd9" }}
          />
        ) : (
          <RadioButtonUncheckedIcon
            className={styles.svgDisabled}
            onClick={() => {
              handleNegotiate(!item.accept, index, "accept");
              // brandAcceptOffer();
            }}
            style={{ width: "31px", height: "31px" }}
          />
        )}
        <p className={item.accept ? styles.active : styles.inActive}>Accept</p>
      </Grid>

      {item.negotiateItem === "revenueShare" ? (
        <Grid item xs={12} className={styles.marginbottomSelect}>
          {item.newPrice ? (
            <CheckCircleIcon
              onClick={() => {
                handleNegotiate(!item.newPrice, index, "newPrice");
              }}
              style={{ width: "31px", height: "31px", color: "#7b5cd9" }}
            />
          ) : (
            <RadioButtonUncheckedIcon
              className={styles.svgDisabled}
              onClick={() => handleNegotiate(!item.newPrice, index, "newPrice")}
              style={{ width: "31px", height: "31px" }}
            />
          )}
          <FormControl fullWidth variant="outlined">
            <TextField
              id="revenue Share"
              fullWidth
              label="Revenue Share"
              variant="outlined"
              className={mainStyles.placeholderColor}
              value={item.negotiateValue}
              onChange={(e) => {
                handleNegotiate(e.target.value, index, "newPriceValue");
              }}
              disabled={item.newPrice === false ? true : false}
              menuprops={{ variant: "menu" }}
              select
              SelectProps={{ IconComponent: () => <Chevron /> }}
            >
              <MenuItem value="" disabled>
                Select New value
              </MenuItem>
              {options.map((option) => (
                <MenuItem key={option} value={option}>
                  {option} %
                </MenuItem>
              ))}
            </TextField>
          </FormControl>
        </Grid>
      ) : item.negotiateItem === "campaignDuration" ? (
        <>
          <Grid item xs={12} sm={12} md={6}>
            <TextField
              id="outlined-basic"
              fullWidth
              value={item.negotiateStartDate}
              onChange={(e) => {
                handleNegotiate(e.target.value, index, "Negotiate StartDate");
              }}
              label="Start Date"
              className={mainStyles.placeholderColor}
              variant="outlined"
              onBlur={() => {
                console.log("Triggered because this input lost focus");
              }}
              // helperText={
              // 	startDateError ? (
              // 		<span className={styles.errorText}> Start Date IN FUTURE </span>
              // 	) : (
              // 			' '
              // 		)
              // }
              InputProps={{
                endAdornment: (
                  <InputAdornment
                    className={styles.inputendornment}
                    position="end"
                  >
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
                initialFocusedDate={moment().add(1, "day")}
                onChange={(console.log("asda"), handleNegotiate)}
                allowKeyboardControl={true}
                orientation="landscape"
                openTo="date"
                format="MM/dd/yyyy"
                margin="normal"
                onBlur={() => {
                  console.log("Triggered because this input lost focus");
                }}
                onClose={() => handleStartDateOpen(false)}
              />
            </MuiPickersUtilsProvider>
          </Grid>

          <Grid item xs={12} sm={12} md={6}>
            <TextField
              id="outlined-basic"
              fullWidth
              value={item.negotiateEndDate}
              onChange={(e) => {
                handleNegotiate(e.target.value, index, "Negotiate EndDate");
              }}
              label="End Date"
              className={mainStyles.placeholderColor}
              variant="outlined"
              onBlur={() => {
                console.log("Triggered because this input lost focus");
              }}
              // helperText={
              // 	startDateError ? (
              // 		<span className={styles.errorText}> Start Date IN FUTURE </span>
              // 	) : (
              // 			' '
              // 		)
              // }
              InputProps={{
                endAdornment: (
                  <InputAdornment
                    className={styles.inputendornment}
                    position="end"
                  >
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
                // initialFocusedDate={moment().add(1, 'day')}
                onChange={handleNegotiate}
                allowKeyboardControl={true}
                orientation="landscape"
                openTo="date"
                format="MM/dd/yyyy"
                margin="normal"
                onBlur={() => {
                  console.log("Triggered because this input lost focus");
                }}
                onClose={() => handleEndDateOpen(false)}
              />
            </MuiPickersUtilsProvider>
          </Grid>
        </>
      ) : (
        <>
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            className={styles.marginbottomSelect}
          >
            {item.newPrice ? (
              <CheckCircleIcon
                onClick={() => {
                  handleNegotiate(!item.newPrice, index, "newPrice");
                }}
                style={{ width: "31px", height: "31px", color: "#7b5cd9" }}
              />
            ) : (
              <RadioButtonUncheckedIcon
                className={styles.svgDisabled}
                onClick={() =>
                  handleNegotiate(!item.newPrice, index, "newPrice")
                }
                style={{ width: "31px", height: "31px" }}
              />
            )}
            <FormControl fullWidth variant="outlined">
              <TextField
                labelid="demo-simple-select-outlined-label"
                id="message"
                label="Enter New Value "
                fullWidth
                disabled={item.newPrice === false ? true : false}
                variant="outlined"
                className={mainStyles.placeholderColor}
                value={item.newPriceValue}
                onChange={(e) =>
                  handleNegotiate(e.target.value, index, "newPriceValue")
                }
                MenuProps={{ variant: "menu" }}
              ></TextField>
            </FormControl>
          </Grid>
        </>
      )}
    </Grid>
  );
};

export default CreateNegotiateItem;
