import { Button, Snackbar, Typography } from "@material-ui/core";
import React from "react";
import ProductService from "../services/ProductService";
import ShoppingCart from "@material-ui/icons/ShoppingCart";
import MuiAlert from "@material-ui/lab/Alert";
import "./Catalog.css";
import CartService from "../services/CartService";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export class Catalog extends React.Component {
  constructor(props) {
    super(props);
    this.state = { products: [], open:false, snackBarType:"warning", snackbarMessage:"message" };
  }

  componentDidMount() {
    const productService = new ProductService();
    productService
      .loadProductById(this.props.match.params.productId)
      .then((data) => {
        this.setState({
          products: data[0],
        });
      });
  }

  handleOpenSnackBar( message, severity ){
    this.setState({open:true, snackbarMessage:message, snackBarType:severity});
  };

  closeSnackBar(){
    this.setState({open:false});
  }

  
  render() {
    const cartService = new CartService();
    const callAddToCart = () => {
      cartService.addSingleProductToCart(this.state.products.id).then((data)=>{
        if(data==="Success"){
          this.handleOpenSnackBar("Product added to cart", "success");
        }else{
          this.handleOpenSnackBar(data, "error");
        }
      });
    };

    const handleClose = (event, reason) => {
      if (reason === "clickaway") {
        return;
      }
      this.closeSnackBar();
    };
  

    return (
      <div className="catalog-container">
        <div className="image-container">
          <img
            src={this.state.products.imageUrl}
            style={{
              height: window.innerHeight / 1.5,
              width: window.innerHeight / 1.5,
              margin: 10,
            }}
          />
        </div>
        <div className="details-container">
          <Typography gutterBottom variant="h4" component="h4">
            {this.state.products.productName}
          </Typography>
          <Typography variant="h5" component="h5">
            ₹{this.state.products.price}
            <strike style={{fontSize: '12px', marginInline: 8,}}>
              ₹{this.state.products.originalPrice}
            </strike>
            <p style={{fontSize: '16px', color: 'red'}}>
              Save ₹{(this.state.products.originalPrice-this.state.products.price).toFixed(0)}<br/>{(((this.state.products.originalPrice-this.state.products.price)/this.state.products.originalPrice)*100).toFixed(0)}%OFF
            </p>
          </Typography>
          <Typography gutterBottom>
            {this.state.products.description}
          </Typography>
          <Button
            color="secondary"
            variant="contained"
            style={{ marginTop: 16 }}
            startIcon={<ShoppingCart />}
            onClick={callAddToCart}
          >
            Add to cart
          </Button>
        </div>
        <Snackbar open={this.state.open} autoHideDuration={2000} onClose={handleClose}>
          <Alert onClose={handleClose} severity={this.state.snackBarType}>
            {this.state.snackbarMessage}
          </Alert>
        </Snackbar>
      </div>
    );
  }
}
