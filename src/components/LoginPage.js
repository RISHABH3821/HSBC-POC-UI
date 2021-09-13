import React from "react";
import { Button, Snackbar, TextField } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import "./LoginPage.css";
import UserService from "../services/UserService";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export const LoginPage = (props) => {
  const {saveCredentials} = props;
  console.log(saveCredentials);
  const [open, setOpen] = React.useState(false);
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [snackbarMessage, setSnackbarMessage] = React.useState(
    "Enter Valid Credentials"
  );
  const [snackBarType, setSnackBarType] = React.useState("warning");

  const userService = new UserService();

  const handleLogin = async () => {
    if (username.length > 3 && password.length > 4) {
      // form is valid perform auth.
      // make api call to check if this username & password are valid.
      const response = await userService.login(username, password);
      if (response === "Success") {
        handleOpenSnackBar({
          message: "Login Successful",
          severity: "success",
        });
        saveCredentials(username, password);
      } else {
        handleOpenSnackBar({
          message: response,
          severity: "error",
        });
      }
    } else {
      // credentials are not valid.
      handleOpenSnackBar({
        message: "Enter Valid Credentials",
        severity: "warning",
      });
    }
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleOpenSnackBar = ({ message, severity }) => {
    setSnackBarType(severity);
    setSnackbarMessage(message);
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <form className="login-form" autoComplete="off">
      <TextField
        label="Username"
        variant="outlined"
        required
        onChange={handleUsernameChange}
      />
      <TextField
        label="Password"
        variant="outlined"
        required
        type="password"
        onChange={handlePasswordChange}
      />
      <Button
        variant="contained"
        color="primary"
        type="submit"
        onClick={(e) => {
          e.preventDefault();
          handleLogin();
        }}
      >
        Login
      </Button>
      <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={snackBarType}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </form>
  );
};
