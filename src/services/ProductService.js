import Configuration from "../configurations/Configuration";

class ProductService {
  constructor() {
    this.config = new Configuration();
  }

  async loadProducts() {
    let products = [];
    const request = await fetch(`${this.config.BASE_URL}products`, {
      headers: {
        "Content-type": "application/json",
      },
      method: "GET",
    })
      .then(async (response) => {
        const data = await response.json();
        products = data.data;
      })
      .catch((error) => console.log(error));
    return products;
  }

  async loadProductById(id) {
    let products = [];
    const request = await fetch(`${this.config.BASE_URL}products/${id}`, {
      headers: {
        "Content-type": "application/json",
      },
      method: "GET",
    })
      .then(async (response) => {
        const data = await response.json();
        products = data.data;
      })
      .catch((error) => console.log(error));
    return products;
  }

}

export default ProductService;
