import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useFishes } from "../contexts/FishesContext";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Button, Container, Grid } from "@material-ui/core";
import axios from "axios";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  table: {
    minWidth: 100,
  },
});

const Checkout = () => {
  const { setSelectedFishId, selectedFishId, fishes } = useFishes();
  const { currentUser } = useAuth();
  const classes = useStyles();
  const history = useHistory();
  if (!selectedFishId) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h2
          style={{
            fontFamily: "Dosis",
            marginTop: "3.5rem",
            textAlign: "center",
            color: "#555",
          }}
        >
          <h2 style={{ color: "crimson" }}>EMPTY CART!! </h2>
          <h3 className="animate__animated animate__flash">
            <Link to="/">Go Add Some Fresh Fish To Cart First</Link>
          </h3>
        </h2>
        <img
          style={{ width: "22rem", marginTop: "4rem", borderRadius: "5px" }}
          src="https://i.ibb.co/fMBs8h4/undraw-empty-cart-co35-1.png"
          alt=""
        />
      </div>
    );
  } else {
    const fish = fishes && fishes.find((fish) => fish._id === selectedFishId);
    const newObj = {
      name: fish.name,
      weight: fish.weight,
      price: fish.price,
      customerEmail: currentUser.email,
    };
    const { name, weight, price } = fish;
    const handleCheckout = async () => {
      try {
        const sendResponse = await axios.post(
          "https://deshi-app.herokuapp.com/orders",
          newObj
        );
        alert("Order Placed");
        console.log(sendResponse);
        setSelectedFishId(null);
        history.push("/");
      } catch (err) {
        console.log(err);
      }
    };
    return (
      <Container style={{ marginTop: "5rem" }} maxWidth="md">
        <Grid container spacing="3">
          <Grid item xs={12} md={6}>
            <TableContainer component={Paper}>
              <Table
                className={classes.table}
                size="small"
                aria-label="a dense table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Quantity</TableCell>

                    <TableCell align="right">Weight</TableCell>
                    <TableCell align="right">Price</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      {name}
                    </TableCell>
                    <TableCell align="center">1</TableCell>
                    <TableCell align="right">{weight} (kg)</TableCell>
                    <TableCell align="right">{price}৳</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
            <Button
              variant="contained"
              color="primary"
              align="right"
              style={{ marginTop: "1rem" }}
              onClick={handleCheckout}
            >
              Checkout
            </Button>
          </Grid>
          <Grid item sm={12} md={6}>
            <div style={{ margin: "0 auto" }}>
              <img
                style={{ maxWidth: "100%", borderRadius: "5px" }}
                src="https://i.ibb.co/WWtLzFP/undraw-Confirmation-re-b6q5.png"
                alt=""
              />
            </div>
          </Grid>
        </Grid>
      </Container>
    );
  }
};

export default Checkout;
