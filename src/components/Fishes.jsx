import { Container, Grid } from "@material-ui/core";
import React from "react";
import { useFishes } from "../contexts/FishesContext";
import LoadingSpinner from "./common/LoadingSpinner";
import Fish from "./Fish";
const Fishes = () => {
  const { fishes } = useFishes();
  if (!fishes) return <LoadingSpinner />;
  return (
    <Container style={{ marginTop: "5rem" }} maxWidth="md" align="center">
      <Grid container spacing={3}>
        {fishes.map((fish) => (
          <Grid item xs={12} sm={6} md={4}>
            <Fish key={fish.id} {...fish} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Fishes;
