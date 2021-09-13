import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { useHistory } from "react-router-dom";
import ShoppingCart from "@material-ui/icons/ShoppingCart";
import CartService from "../services/CartService";
import { Snackbar } from "@material-ui/core";

import MuiAlert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    margin: 8,
  },
  media: {
    height: 200,
    backgroundSize: "contain",
  },
  title: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
  },
  strikePrice: {
    fontSize: theme.typography.pxToRem(12),
    marginInline: 8,
  },
  saveDiscount:{
    fontSize: theme.typography.pxToRem(16),
    color: theme.palette.secondary.main
  }
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export const ProductTile = (props) => {
  const history = useHistory();

  const [open, setOpen] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState(
    "Enter Valid Credentials"
  );
  const [snackBarType, setSnackBarType] = React.useState("warning");

  const routeChangeTo = (route) => {
    history?.push(route);
  };

  const cartService = new CartService();
  const callAddToCart = (id) => {
    cartService.addSingleProductToCart(id).then((data) => {
      if (data == "Success") {
        handleOpenSnackBar("Product added to cart", "success");
      } else {
        handleOpenSnackBar(data, "error");
      }
    });
  };

  const classes = useStyles();
  const { product } = props;

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
    <Card className={classes.root}>
      <CardActionArea onClick={() => routeChangeTo(`/catalog/${product.id}`)}>
        <CardMedia
          className={classes.media}
          image={product.imageUrl}
          title="Product Image"
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="subtitle1"
            component="h6"
            className={classes.title}
          >
            {product.productName}
          </Typography>
          <Typography variant="h6" component="h6">
            ₹{product.price}
            <strike className={classes.strikePrice}>
              ₹{product.originalPrice}
            </strike>
            <span className={classes.saveDiscount}>
              {(((product.originalPrice-product.price)/product.originalPrice)*100).toFixed(0)}%OFF
            </span>
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button
          color="secondary"
          variant="contained"
          style={{ flexGrow: 1 }}
          startIcon={<ShoppingCart />}
          onClick={() => callAddToCart(product.id)}
        >
          Add to cart
        </Button>
      </CardActions>
      <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={snackBarType}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Card>
  );
};
