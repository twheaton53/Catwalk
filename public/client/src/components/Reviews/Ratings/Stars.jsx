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

const Stars = ({rating}) => {
  const classes = useStyles();
  // const {rating} = rating;
  console.log(rating);
  return (
    <div>
      <Rating
      // name = "half-rating-read"
        defaultValue={rating}
        precision={0.25}
        size="small"
        readOnly
      />
    </div>
  );
};

export default Stars;
