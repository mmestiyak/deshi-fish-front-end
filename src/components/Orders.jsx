import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import LoadingSpinner from "./common/LoadingSpinner";

import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Container, Grid } from "@material-ui/core";

const useStyles = makeStyles({
  table: {
    minWidth: 100,
  },
});

const Orders = () => {
  const classes = useStyles();

  const { currentUser } = useAuth();
  const [orders, setOrders] = useState();
  useEffect(() => {
    (async () => {
      try {
        const getOrders = await axios.post(
          "https://deshi-app.herokuapp.com/orders/my-orders",
          {
            customerEmail: currentUser.email,
          }
        );
        setOrders(getOrders.data);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [currentUser]);

  if (!orders) return <LoadingSpinner />;
  if (orders.length === 0) {
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
          <h2 style={{ color: "crimson" }}>NOTHING ORDERED! </h2>
          <h3 className="animate__animated animate__flash">
            <Link to="/">
              {" "}
              Go Order Some Fresh Fish First to See Your Orders List
            </Link>
          </h3>
        </h2>
        <img
          style={{ width: "22rem", marginTop: "4rem", borderRadius: "5px" }}
          src="https://i.ibb.co/88Rg8Qr/undraw-empty-xct9.png"
          alt=""
        />
      </div>
    );
  }
  if (orders) {
    return (
      <Container style={{ marginTop: "5rem" }} maxWidth="md">
        <Grid container spacing="3" style={{ minHeight: "100vh" }}>
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
                  {orders.map(({ name, weight, price }) => (
                    <TableRow>
                      <TableCell component="th" scope="row">
                        {name}
                      </TableCell>
                      <TableCell align="center">1</TableCell>
                      <TableCell align="right">{weight} (kg)</TableCell>
                      <TableCell align="right">{price}৳</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
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

export default Orders;
