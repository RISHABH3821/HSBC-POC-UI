import {
  Button,
  Divider,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Snackbar,
  Typography,
} from "@material-ui/core";
import React from "react";
import CartService from "../services/CartService";
import UserService from "../services/UserService";
import { CartItem } from "./CartItem";
import ShopingBasket from "@material-ui/icons/ShoppingBasket";
import OrderService from "../services/OrderService";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}


export class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      address: "",
      open: false,
      snackBarType: "warning",
      snackbarMessage: "message",
    };
  }

  componentDidMount() {
    this.loadCartData();
    const userService = new UserService();
    userService.loadAddress().then((data) => {
      this.setState({ address: data });
    });
  }

  loadCartData = () => {
    const cartService = new CartService();
    cartService.fetchUserCart().then((data) => {
      this.setState({ products: data });
    });
  };

  get calculateTotal() {
    return this.state.products.reduce(
      (sum, { price, quantity }) => sum + price * quantity,
      0
    );
  }

  placeOrder = () => {
    const orderService = new OrderService();
    orderService.placeOrder().then((_) => {
      this.loadCartData();
      this.handleOpenSnackBar("Order plcaed succesfully", "success");
    });
  };

  handleOpenSnackBar(message, severity) {
    this.setState({
      open: true,
      snackbarMessage: message,
      snackBarType: severity,
    });
  }

  closeSnackBar() {
    this.setState({ open: false });
  }

  render() {
    const handleClose = (event, reason) => {
      if (reason === "clickaway") {
        return;
      }
      this.closeSnackBar();
    };

    return (
      <div style={{ flexGrow: 1, textAlign: "-webkit-center" }}>
        <List style={{ maxWidth: "75vw" }}>
          {this.state.products.map((cartData) => {
            return (
              <CartItem
                key={cartData.productId}
                cartItemData={cartData}
                refreshCart={this.loadCartData}
              />
            );
          })}
          <Divider />
          {this.state.products.length > 0 ? (
            <div>
              <ListItem style={{ justifyContent: "space-between" }}>
                <Typography variant="h5">Total:</Typography>
                <Typography variant="h5">
                  ₹{this.calculateTotal.toFixed(2)}
                </Typography>
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Delivery Address:"
                  secondary={this.state.address}
                />
                <ListItemSecondaryAction>
                  <Button
                    variant="contained"
                    size="large"
                    color="primary"
                    startIcon={<ShopingBasket />}
                    onClick={this.placeOrder}
                  >
                    Place Order
                  </Button>
                </ListItemSecondaryAction>
              </ListItem>
            </div>
          ) : (
            <Typography style={{ margin: 50 }} variant="h5">
              No Items In Cart. Go Shopping!
            </Typography>
          )}
        </List>
        <Snackbar
          open={this.state.open}
          autoHideDuration={2000}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity={this.state.snackBarType}>
            {this.state.snackbarMessage}
          </Alert>
        </Snackbar>
      </div>
    );
  }
}
