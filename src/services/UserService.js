import Configuration from "../configurations/Configuration";

class UserService {
  constructor() {
    this.config = new Configuration();
  }

  async login(userName, password) {
    const data = {
      userName: userName,
      password: password,
    };

    let response = "Login Failed, Check Credentials";

    const request = await fetch(`${this.config.BASE_URL}user/login`, {
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
        response = "Login Failed, Check Credentials";
      });
    return response;
  }

  async register(form) {
    let response = "SignUp Failed";

    const request = await fetch(`${this.config.BASE_URL}user/register`, {
      headers: {
        "Content-type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(form),
    })
      .then(async (data) => {
        if (data.status === 200) {
          response = "Success";
        } else {
          const errorMessage = await data.json();
          response = errorMessage.message;
        }
      })
      .catch((error) => {
        console.log(error);
        response = error;
      });
    return response;
  }

  async loadAddress() {
    const userName = sessionStorage.getItem("userName");
    let products = [];
    const request = await fetch(
      `${this.config.BASE_URL}user/address?userName=${userName}`,
      {
        headers: {
          "Content-type": "application/json",
        },
        method: "GET",
      }
    )
      .then(async (response) => {
        const data = await response.json();
        products = data.data[0];
      })
      .catch((error) => console.log(error));
    return products;
  }

  async loadProfile() {
    const userName = sessionStorage.getItem("userName");
    let products = [];
    const request = await fetch(
      `${this.config.BASE_URL}user/profile?userName=${userName}`,
      {
        headers: {
          "Content-type": "application/json",
        },
        method: "GET",
      }
    )
      .then(async (response) => {
        const data = await response.json();
        products = data.data[0];
      })
      .catch((error) => console.log(error));
    return products;
  }

  async update(form) {
    let response = "SignUp Failed";
    const userName = sessionStorage.getItem("userName");
    const request = await fetch(`${this.config.BASE_URL}user/profile?userName=${userName}`, {
      headers: {
        "Content-type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(form),
    })
      .then(async (data) => {
        if (data.status === 200) {
          response = "Success";
        } else {
          const errorMessage = await data.json();
          response = errorMessage.message;
        }
      })
      .catch((error) => {
        console.log(error);
        response = error;
      });
    return response;
  }

}
export default UserService;
