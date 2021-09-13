import {
  Avatar,
  Button,
  ButtonGroup,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  makeStyles,
  Typography,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import CartService from "../services/CartService";
import { useHistory } from "react-router";
import './CartItem.css'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));

export const CartItem = (props) => {
  const classes = useStyles();
  const { cartItemData, refreshCart } = props;
  const cartService = new CartService();

  const changeCount = (cartId, increment) => {
    cartService.modifyCartCount(cartId, increment).then((data) => {
      refreshCart();
    });
  };

  const history = useHistory();

  const routeChangeTo = (route) => {
    history?.push(route);
  };

  return (
    <ListItem>
        <ListItemAvatar onClick={()=>routeChangeTo(`/catalog/${cartItemData.productId}`)}>
          <Avatar variant="square" className={classes.large} src={cartItemData.productImage}/>
        </ListItemAvatar>
      <div style={{ width: "70%" }}>
        <ListItemText
          primary={cartItemData.productName}
          secondary={`Price: ₹${cartItemData.price}`}
        />
      </div>
      <ListItemSecondaryAction
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Typography variant="h6" style={{ marginInlineEnd: 8 }}>
          ₹{(cartItemData.price * cartItemData.quantity).toFixed(2)}
        </Typography>
        <ButtonGroup
          color="primary"
          size="small"
          aria-label="outlined primary button group"
        >
          <Button
            size="small"
            color={cartItemData.quantity === 1 ? "secondary" : "primary"}
            variant="outlined"
            disableElevation
            onClick={() => changeCount(cartItemData.id, false)}
          >
            {cartItemData.quantity === 1 ? <DeleteIcon /> : <RemoveIcon />}
          </Button>
          <Button>{cartItemData.quantity}</Button>
          <Button
            size="small"
            variant="outlined"
            disableElevation
            onClick={() => changeCount(cartItemData.id, true)}
          >
            <AddIcon />
          </Button>
        </ButtonGroup>
      </ListItemSecondaryAction>
    </ListItem>
  );
};
