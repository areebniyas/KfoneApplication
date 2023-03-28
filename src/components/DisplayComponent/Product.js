import React, { useState } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
} from "@mui/material";
import Button from "@mui/material/Button";
import Fab from "@mui/material/Fab";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import users from "../../data/dummy_users.json";
import CheckIcon from "@mui/icons-material/Check";


function Product({ product, isLoggedIn }) {
  // TODO : 
  // Add to cart for
  // a logged in user
  const alreadyInCart = false;
  const [addedToCart, setAddedToCart] = useState(alreadyInCart);

  const addToCart = () => {
    const user = users[0];
    // Add the product to the user's cart
    localStorage.setItem("user", JSON.stringify(user));
    
    user.cart.push(product.Name);
    // Convert the updated data to a JSON string
    const updatedUser = JSON.stringify(user);
    // Save the updated data back to localStorage
    localStorage.setItem("user", updatedUser);
    console.log("user:", user);
    setAddedToCart(true);
  };
  return (
    <Card sx={{ width: 300, height: 600, position: "relative" }}>
      <CardMedia
        component="img"
        image="/images/default-img.jpeg"
        height="300"
        alt={product.Name}
      />
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <div style={{ width: "95%" }}>
          <Typography variant="h6" sx={{ marginBottom: 1 }}>
            {product.Name}
          </Typography>
          <Typography variant="h5" sx={{ marginBottom: 1 }}>
            ${product.Price}
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{
              overflow: "hidden",
              marginBottom: 1,
              maxWidth: "300px",
              whiteSpace: "nowrap",
            }}
          >
            {product.Description}
          </Typography>
          <Typography variant="h5" sx={{ marginBottom: 3 }}>
            {product.Manufacturer}
          </Typography>
          {isLoggedIn && (
            <CardActions>
              <Fab aria-label="like" style={{ marginRight: "125px" }}>
                <FavoriteBorderIcon />
              </Fab>
              <Fab aria-label="add-to-cart" onClick={addToCart}>
                {addedToCart ? (
                  <CheckIcon />
                ) : (
                  <AddShoppingCartIcon />
                )}
              </Fab>
            </CardActions>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default Product;
