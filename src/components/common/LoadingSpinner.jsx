import React from "react";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  backdrop: {
    color: "#fff",
  },
}));
const LoadingSpinner = () => {
  const classes = useStyles();

  return (
    <Backdrop className={classes.backdrop} open>
      <CircularProgress />
    </Backdrop>
  );
};

export default LoadingSpinner;
