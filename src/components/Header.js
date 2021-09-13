import { AppBar, colors, Toolbar } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import React from "react";
import { useHistory } from "react-router-dom";
import "./Header.css";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  margin: {
    margin: theme.spacing(2),
  },
}));

const ColorButton = withStyles((theme) => ({
  root: {
    color: theme.palette.common.white,
    backgroundColor: theme.palette.primary,
    "&:hover": {
      backgroundColor: colors.deepPurple,
    },
  },
}))(Button);

export const Header = (props) => {
  const { logUser } = props;
  const classes = useStyles();

  const history = useHistory();

  const [currentLocation, setCurrentLocation] = React.useState(
    history.location.pathname
  );

  const logOutUser = () => {
    sessionStorage.clear();
    logUser();
  };

  const routeChangeTo = (route) => {
    history?.push(route);
    setCurrentLocation(route);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <ColorButton
          className={classes.margin}
          onClick={() => routeChangeTo("/")}
          style={{
            border: currentLocation === "/" ? "1px solid white" : "none",
          }}
          variant={currentLocation === "/" ? "outlined" : "text"}
        >
          Shop
        </ColorButton>
        <ColorButton
          className={classes.margin}
          style={{
            border: currentLocation === "/cart" ? "1px solid white" : "none",
          }}
          onClick={() => routeChangeTo("/cart")}
          variant={currentLocation === "/cart" ? "outlined" : "text"}
        >
          Cart
        </ColorButton>
        <ColorButton
          className={classes.margin}
          onClick={() => routeChangeTo("/orders")}
          style={{
            border: currentLocation === "/orders" ? "1px solid white" : "none",
          }}
          variant={currentLocation === "/orders" ? "outlined" : "text"}
        >
          Orders
        </ColorButton>
        <ColorButton
          className={classes.margin}
          onClick={() => routeChangeTo("/profile")}
          style={{
            border: currentLocation === "/profile" ? "1px solid white" : "none",
          }}
          variant={currentLocation === "/profile" ? "outlined" : "text"}
        >
          Profile
        </ColorButton>
        <div className={classes.title} />
        <Button
          variant="contained"
          color="secondary"
          onClick={logOutUser}
          disableElevation
          style={{ backgroundColor: "rgb(27 40 109)" }}
        >
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};
