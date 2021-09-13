import React from "react";
import { Button, Snackbar, TextField } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import "./SignUpPage.css";
import UserService from "../services/UserService";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export const SignUpPage = (props) => {
  const { saveCredentials } = props;
  const [open, setOpen] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState(
    "Enter Valid Credentials"
  );
  const [snackBarType, setSnackBarType] = React.useState("warning");

  const [formValues, setFormValues] = React.useState({
    fullName: "",
    userName: "",
    address: "",
    email: "",
    phone: "",
    password: "",
  });

  function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  const userService = new UserService();

  const handleSignUp = async () => {
    const usernameRegex = /^[a-zA-Z0-9]+$/;

    if (formValues.fullName.length < 5) {
      handleOpenSnackBar("Enter Valid Full Name", "warning");
    } else if (formValues.userName.length < 5) {
      handleOpenSnackBar(
        "Enter Valid Username, no spaces or special chars",
        "warning"
      );
    } else if (formValues.address.length < 5) {
      handleOpenSnackBar("Enter Valid Address", "warning");
    } else if (
      !validateEmail(formValues.email) ||
      !formValues.email.length === 0
    ) {
      handleOpenSnackBar("Enter Valid Email", "warning");
    } else if (formValues.phone.length !== 14) {
      handleOpenSnackBar("Enter Valid Phone", "warning");
    } else if (formValues.password.length < 5) {
      handleOpenSnackBar("Enter Valid Password, at least 5 chars", "warning");
    } else {
      const result = await userService.register(formValues);
      if (result === "Success") {
        handleOpenSnackBar("Registration Successful", "success");
        saveCredentials(formValues.userName, formValues.password);
      } else {
        handleOpenSnackBar(result, "error");
      }
    }
  };

  const handleFormChange = (prop) => (event) => {
    setFormValues({ ...formValues, [prop]: event.target.value });
  };

  const handleOpenSnackBar = (message, severity) => {
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
    <form className="signup-form" autoComplete="off">
      <TextField
        label="Fullname"
        placeholder="First Name, Last Name"
        variant="outlined"
        value={formValues.fullName}
        onChange={handleFormChange("fullName")}
        required
      />
      <TextField
        label="Username"
        placeholder="Choose unique username"
        value={formValues.userName}
        onChange={handleFormChange("userName")}
        variant="outlined"
        required
      />
      <TextField
        label="Email"
        placeholder="example@xyz.com"
        variant="outlined"
        value={formValues.email}
        onChange={handleFormChange("email")}
        type="email"
      />
      <TextField
        label="Phone"
        placeholder="+91-XXXXXXXXXX"
        variant="outlined"
        value={formValues.phone}
        onChange={handleFormChange("phone")}
        required
        type="tel"
      />
      <TextField
        label="Address"
        placeholder="House no. Street name, Landmark, District, ZipCode"
        variant="outlined"
        value={formValues.address}
        onChange={handleFormChange("address")}
        required
        type="text"
      />
      <TextField
        label="Password"
        placeholder="Choose secure password"
        variant="outlined"
        value={formValues.password}
        onChange={handleFormChange("password")}
        required
        type="password"
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        onClick={(e) => {
          e.preventDefault();
          handleSignUp();
        }}
      >
        Sign Up
      </Button>
      <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={snackBarType}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </form>
  );
};
