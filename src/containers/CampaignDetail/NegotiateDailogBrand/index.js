import React, { useState } from "react";
import { Grid, Dialog, Select, DialogTitle } from "@material-ui/core";
import styles from "./NegotiateDialog.module.scss";
import TextField from "../../../components/TextField";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import SVG from "react-inlinesvg";
import { Plus } from "react-feather";
import CreateNegotiateItem from "./CreateNegotiateItem";

const options = [];
for (let i = 1; i <= 20; i += 0.5) {
  options.push(i);
}

const NegotiateDialog = ({
  open,
  negotiables,
  handleClose,
  negotiate,
  handleNegotiate,
  negotiateCampaign,
  startDateOpen,
  endDateOpen,
  handleStartDateOpen,
  handleEndDateOpen,
  brandAcceptOffer,
}) => {
  return (
    <Dialog
      classes={{ paper: styles.negotiate }}
      aria-labelledby="confirmation-dialog-title"
      open={open}
      onClose={handleClose}
    >
      <DialogTitle className={styles.Heading} id="negotiate-dialog-title">
        <p>Negotiate</p>
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
          brandAcceptOffer={brandAcceptOffer}
        />
      ))}
      <div className={styles.footer}>
        <span onClick={handleClose}>Cancel</span>
        <button
          onClick={() => {
            negotiateCampaign();
          }}
        >
          Send to Influencer
        </button>
      </div>
    </Dialog>
  );
};

export default NegotiateDialog;
