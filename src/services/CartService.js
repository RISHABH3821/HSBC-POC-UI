import Configuration from "../configurations/Configuration";

class CartService {
  constructor() {
    this.config = new Configuration();
  }

  async addSingleProductToCart(productId) {
    const data = {
      productId: productId,
      userName: sessionStorage.getItem("userName"),
    };

    let response = "Failed";

    const request = await fetch(`${this.config.BASE_URL}cart`, {
      headers: {
        "Content-type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(data),
    })
      .then(async(data) => {
        if (data.status === 200) {
          response = "Success";
        }else{
          const error = await data.json();
          response = error.message;
        }
      })
      .catch((error) => {
        response = "Failed to add to cart";
      });
    return response;
  }

  async fetchUserCart() {
    const userName = sessionStorage.getItem("userName");
    let products = [];
    const request = await fetch(`${this.config.BASE_URL}cart?userName=${userName}`, {
      headers: {
        "Content-type": "application/json",
      },
      method: "GET",
    })
      .then(async (response) => {
        const data = await response.json();
        products = data.data;
        console.log(products);
      })
      .catch((error) => console.log(error));
    return products;
  }

  async modifyCartCount(cartId, increment) {
    const data = {
      id: cartId,
      increment: increment
    };

    let response = "Failed";

    const request = await fetch(`${this.config.BASE_URL}cart/change`, {
      headers: {
        "Content-type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(data),
    })
      .then((data) => {
        if (data.status === 200) {
          response = "Success";
        }
      })
      .catch((error) => {
        response = error;
      });
    return response;
  }


}

export default CartService;
