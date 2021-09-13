import React from "react";
import ProductService from "../services/ProductService";
import { ProductTile } from "./ProductTile";

export class Shop extends React.Component {
    constructor(props) {
      super(props);
      this.state = {products: []};
    }

  componentDidMount() {
    const productService = new ProductService();
    productService.loadProducts().then((data) => {
        this.setState({
            products: data
        });
    });    
  }
  render() {
  return (
    <div
      style={{ display: "grid", gridTemplateColumns: "auto auto auto auto" }}
    >
        {this.state.products.map((p)=>{
            return <ProductTile key={p.id} product = {p}/>
        })}
    </div>
  );
    }
};
