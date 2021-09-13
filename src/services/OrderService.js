import Configuration from "../configurations/Configuration";

class OrderService {
  constructor() {
    this.config = new Configuration();
  }

  async fetchUserOrders() {
    const userName = sessionStorage.getItem("userName");
    let orders = [];
    const request = await fetch(
      `${this.config.BASE_URL}order?userName=${userName}`,
      {
        headers: {
          "Content-type": "application/json",
        },
        method: "GET",
      }
    )
      .then(async (response) => {
        const data = await response.json();
        orders = data.data;
        console.log(orders);
      })
      .catch((error) => console.log(error));
    return orders;
  }

  async placeOrder() {
    const userName = sessionStorage.getItem("userName");
    let response = "Failed";

    const request = await fetch(
      `${this.config.BASE_URL}order?userName=${userName}`,
      {
        headers: {
          "Content-type": "application/json",
        },
        method: "POST",
      }
    )
      .then((data) => {
        if (data.status === 200) {
          response = "Success";
        }
      })
      .catch((error) => {
        response = "Failed to add to cart";
      });
    return response;
  }
}

export default OrderService;
