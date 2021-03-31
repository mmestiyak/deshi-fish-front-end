import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import CssBaseline from "@material-ui/core/CssBaseline";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    // paddingTop: "56.25%", // 16:9
    // paddingTop: "100%", // 16:9
    padding: "100% 5% 0 5%",
  },
  cardContent: {
    flexGrow: 1,
  },
});

export default function Fish({ image, name, weight, price }) {
  const classes = useStyles();
  return (
    <>
      <CssBaseline />
      <Card className={classes.card}>
        <CardActionArea>
          <CardMedia className={classes.cardMedia} image={image} title={name} />
          <CardContent className={classes.cardContent}>
            <Typography gutterBottom variant="h5" component="h2">
              {name} - {weight}kg
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <Typography variant="h5" color="primary">
            {price}৳
          </Typography>
          <Button variant="outlined" size="large" color="primary">
            Buy
          </Button>
        </CardActions>
      </Card>
    </>
  );
}
