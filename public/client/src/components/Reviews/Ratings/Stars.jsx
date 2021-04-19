/* eslint-disable no-unused-vars */
import React from 'react';
import Rating from '@material-ui/lab/Rating';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    '& > * + *': {
      marginTop: theme.spacing(1),
    },
  },
}));

const Stars = () => {
  const classes = useStyles();
  return (
    <div>
      <Rating
      // name = "half-rating-read"
        defaultValue={3.75}
        precision={0.25}
        size="large"
        readOnly
      />
    </div>
  );
};

export default Stars;
