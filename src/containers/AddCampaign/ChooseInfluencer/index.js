import React, { useEffect, useState } from 'react';
import { Grid } from '@material-ui/core';
import InfluencerCard from './InfluencerCard';
import styles from './ChooseInfluencer.module.scss';
import _ from 'lodash';

const ChooseInfluencer = ({
  selectedInfluncer,
  toggleInfluncer,
  influencers,
  handleActiveForInfluncer,
  handleInfluencers,
}) => {
  const [sortedInfluencers, setSortedInfluencers] = useState([]);
  /**check for conditions and activate the next button for influencer */
  useEffect(() => {
    handleActiveForInfluncer();
  }, [selectedInfluncer]);

  useEffect(() => {

    if (selectedInfluncer && selectedInfluncer !== null) {
      const selectedInfluencerIndex = _.findIndex(influencers, {
        id: selectedInfluncer && selectedInfluncer.id,
      });
      if (selectedInfluencerIndex > -1) {
        let influencersCopy = _.cloneDeep(influencers);
        const firstInfluencer = influencersCopy[0];
        influencersCopy[0] = influencersCopy[selectedInfluencerIndex];
        influencersCopy[selectedInfluencerIndex] = firstInfluencer;
        setSortedInfluencers(influencersCopy);
      }
    } else {
      setSortedInfluencers(influencers);
    }
  }, [influencers]);

  return (
    <div className={styles.container} style={{ paddingTop: "8px" }}>
      <Grid container spacing={2}>
        {sortedInfluencers.map((influencer, index1) => {
          const index =
            selectedInfluncer !== null &&
              selectedInfluncer.name === influencer.name
              ? true
              : false;
          return (
            <Grid
              item
              md={6}
              xs={12}
              className={styles.gridItem}
              style={{ marginTop: 20 }}
              key={index1}
            >
              <InfluencerCard
                influencer={influencer}
                selected={index}
                key={index}
                toggleInfluncer={toggleInfluncer}
              />
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};

export default ChooseInfluencer;
