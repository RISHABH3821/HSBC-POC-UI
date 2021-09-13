import { Divider, List, Typography } from "@material-ui/core";
import React from "react";
import OrderService from "../services/OrderService";
import { OrderItem } from "./OrderItem";

export const Orders = (props) => {
  const orderService = new OrderService();
  const [orders, setOrders] = React.useState([]);
  React.useEffect(() => {
    orderService.fetchUserOrders().then((data) => {
      setOrders(data);
    });
  }, []); // <-- Have to pass in [] here!

  return (
    <div style={{ flexGrow: 1, textAlign: "-webkit-center" }}>
      {orders.length > 0 ? (
        <List style={{ maxWidth: "75vw" }}>
          {orders.map((orderData) => {
            return (
              <div key={orderData.orderId}>
                <OrderItem  orderData={orderData} />
                <Divider/>
              </div>
            );
          })}
        </List>
      ) : (
        <Typography style={{ margin: 50 }} variant="h5">
          No Orders, Go Shopping!
        </Typography>
      )}
    </div>
  );
};
