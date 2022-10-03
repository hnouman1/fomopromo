import React, { useEffect } from 'react';
import styles from './Negotiables.module.scss';
import { Grid } from '@material-ui/core';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

const Negotiables = ({ selectedNegotiable, toggleNegotiable, handleActiveForNegotiable }) => {

  /**check for conditions and activate the next button for negotiable */
  useEffect(() => {
    handleActiveForNegotiable();
  }, [selectedNegotiable])
  return (
    <div className={styles.mainContainer} style={{ paddingTop: "8px" }}>
      <p className={styles.title}>
			 Deselect the items you do not wish to negotiate with the influencer.      
			</p>
      <div className={styles.optionsContainer}>
        <Grid container spacing={2}>
          {selectedNegotiable.map((option, index) => {
            return (
              <Grid item xs={6} key={index}>
                <div className={styles.optionsItem}>
                  {option.isChecked ? (
                    <CheckCircleIcon
                      onClick={() => {
                        toggleNegotiable(option);
                      }}
                    />
                  ) : (
                      <RadioButtonUncheckedIcon
                        onClick={() => {
                          toggleNegotiable(option);
                        }}
                      />
                    )}
                  <span
                    style={{ paddingLeft: "0px" }}
                    onClick={() => {
                      toggleNegotiable(option);
                    }}>{option.text}</span>
                </div>
              </Grid>
            );
          })}
        </Grid>
      </div>
    </div>
  );
};

export default Negotiables;
