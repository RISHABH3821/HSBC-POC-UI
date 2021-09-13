import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Avatar, ListItemAvatar } from "@material-ui/core";
import { useHistory } from "react-router";
import "./OrderItem.css";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexShrink: 0,
    marginRight: 10,
    textAlign: "justify",
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
    textAlign: "justify",
    flex: 1,
  },
  details: {
    fontSize: theme.typography.pxToRem(14),
    textAlign: "justify",
  },
  statusHeading: {
    fontSize: theme.typography.pxToRem(14),
    marginLeft: 10,
    textAlign: "justify",
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));

export const OrderItem = (props) => {
  const classes = useStyles();
  const { orderData } = props;
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const history = useHistory();

  const routeChangeTo = (route) => {
    history?.push(route);
  };

  return (
    <div className={classes.root}>
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id={"panel1bh-header" + orderData.orderId}
        >
          <Typography className={classes.heading}>
            {orderData.orderId}
          </Typography>
          <Typography className={classes.secondaryHeading}>
            {orderData.productName}
          </Typography>
          <Typography className={classes.statusHeading}>
            <b>{orderData.status}</b>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div>
            <ListItemAvatar
              style={{ display: "flex" }}
              onClick={() =>
                routeChangeTo(`/catalog/${orderData.productId}`)
              }
            >
              <Avatar
                variant="square"
                className={classes.large}
                src={orderData.productImage}
              />
            </ListItemAvatar>
            <Typography className={classes.heading}>
              <b>Total: ₹{orderData.total}</b>
            </Typography>
            <Typography className={classes.details}>
              Quantity: {orderData.quantity}
              <br />
              Price: ₹{orderData.price}
              <br />
              Address:{orderData.address}
              <br />
              Last Updated At:{" "}
              {new Date(orderData.lastUpdatedAt).toLocaleDateString("en-US")}
            </Typography>
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};
