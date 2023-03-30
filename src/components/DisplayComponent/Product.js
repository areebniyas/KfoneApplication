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
import handler from "../../pages/api/userInfo";
import { useSession } from "next-auth/react";

function Product({ product, isLoggedIn, addedToCart, cart }) {
  // TODO :
  // Add to cart for
  // a logged in user
  const { data: session, status } = useSession();
  const [isAdded, setIsAdded] = useState(false)
  // console.log(cart.cart)
  // console.log(product.Name, "...")
  // console.log(cart.cart.includes(product.Name))
  // if (cart.cart.includes(product.Name)){
  //   setAddedToCart(true)
  // }


  const addToCart = async () => {
    const uid = session.user["sub"];
  
    const newCart = [...cart.cart, product.Name]
    console.log("user cart, ", newCart )
    localStorage.setItem("cart", JSON.stringify(newCart))
  
    // Update the user data in the API
    const updateResponse = await fetch(`http://localhost:3000/api/users?sub=${uid}&field=cart`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newCart)
    });

    // console.log("res", updateResponse)
  
    if (updateResponse.ok) {
      setIsAdded(true);
      
    }
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
              <Fab aria-label="add-to-cart" disabled={addedToCart || isAdded}  onClick={addToCart}>
                {(addedToCart || isAdded) ? <CheckIcon /> : <AddShoppingCartIcon />}
              </Fab>
            </CardActions>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default Product;
