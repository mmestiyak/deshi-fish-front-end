import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Fade from "@material-ui/core/Fade";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuItem: {
    marginRight: ".8rem",
  },
  title: {
    flexGrow: 1,
  },
  button: {},
}));

export default function Navbar() {
  const classes = useStyles();
  const { currentUser, logout } = useAuth();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <Link to="/">Deshi Fish</Link>
          </Typography>
          <Button className={classes.menuItem} color="inherit">
            <Link to="/orders">Orders</Link>
          </Button>
          <Button className={classes.menuItem} color="inherit">
            <Link to="/checkout">Checkout</Link>
          </Button>
          <Button className={classes.menuItem} color="inherit">
            <Link to="/admin">Admin</Link>
          </Button>

          {currentUser ? (
            <>
              <Avatar
                className={classes.menuItem}
                aria-controls="fade-menu"
                aria-haspopup="true"
                onClick={handleClick}
                style={{ border: "1px solid #fff", cursor: "pointer" }}
                alt={currentUser.displayName}
                src={currentUser.photoURL}
              />
              <Menu
                id="fade-menu"
                anchorEl={anchorEl}
                keepMounted
                open={open}
                onClose={handleClose}
                TransitionComponent={Fade}
              >
                <MenuItem onClick={handleClose}>
                  {currentUser.displayName}
                </MenuItem>
                <MenuItem onClick={logout}>Logout</MenuItem>
              </Menu>
            </>
          ) : (
            <Button className={classes.menuItem} color="inherit">
              <Link to="/signin">Sign in</Link>
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
