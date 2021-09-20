import React from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { Cart } from "./Cart";
import { Catalog } from "./Catalog";
import { Header } from "./Header";
import { Orders } from "./Orders";
import { Profile } from "./Profile";
import { Shop } from "./Shop";

export const HomePage = (props) => {
  const {logUser} = props;
  return (
    <div style={{ height: "100vh", flexGrow:1 }}>
      <Router>
        <Header logUser = {logUser}/>
        <Switch>
          <Route exact path="/">
            <Shop />
          </Route>
          <Route path="/cart">
            <Cart />
          </Route>
          <Route path="/orders">
            <Orders />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
          <Route path="/catalog/:productId" component={Catalog}/>
          <Redirect to='/' />
        </Switch>
      </Router>
    </div>
  );
};
