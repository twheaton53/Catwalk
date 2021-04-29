/* eslint-disable no-unused-vars */
import React, { useContext } from 'react';
import Rating from '@material-ui/lab/Rating';
import { makeStyles } from '@material-ui/core/styles';
import ProductInfo from '../../../store/product';

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
  const ctx = useContext(ProductInfo);
  const { rating } = ctx;
  console.log(rating);
  const classes = useStyles();
  return (
    <span>
      <Rating
      // name = "half-rating-read"
        key={rating}
        defaultValue={rating}
        precision={0.25}
        size="small"
        readOnly
      />
    </span>
  );
};

export default Stars;
