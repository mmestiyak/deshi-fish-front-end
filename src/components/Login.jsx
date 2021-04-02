import { Container, Grid, Button } from "@material-ui/core";
import React from "react";
import Google from "../images/google.svg";
import { useAuth } from "../contexts/AuthContext";
const Login = () => {
  const { login } = useAuth();
  return (
    <div className="login">
      <Container maxWidth="md" style={{ marginTop: "4rem" }} align="center">
        <Grid container>
          <Grid item xs="12">
            <img alt="" style={{ width: "8rem" }} src={Google} />
            <h2
              style={{
                fontFamily: "Dosis, sans-serif",
                marginBottom: "5rem",
                letterSpacing: "1px",
                color: "#555",
              }}
            >
              Sign in
            </h2>
            <Button
              onClick={() => login()}
              size="large"
              color="default"
              variant="outlined"
            >
              <img
                alt=""
                src="https://img.icons8.com/offices/30/000000/google-logo.png"
              />
              <pre style={{ fontFamily: "Dosis, sans-serif" }}>
                Sign in with Google
              </pre>
            </Button>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Login;
