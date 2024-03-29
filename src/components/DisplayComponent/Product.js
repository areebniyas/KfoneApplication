import React, { useEffect, useState } from "react";
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
// ES6 Modules or TypeScript
import Swal from "sweetalert2";

function Product({ product, isLoggedIn, addedToCart }) {
  const { data: session, status } = useSession();
  const [isAdded, setIsAdded] = useState(false);
  const [cart, setCart] = useState([]);
  let uid = "";
  if(session != null)
  {
    uid = session.user["sub"];
  }
  // CommonJS
  const Swal = require("sweetalert2");

  const checkCart = async () => {
    const updateResponse = await fetch(
      `http://localhost:3000/api/getUserAttr?sub=${uid}&field=cart`
    );
    const updateResult = await updateResponse.json();
    return updateResult;
  };

  const addToCart = async () => {
    if (!session) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Please login to add to cart!",
      });
      return;
    }
    const cart = await checkCart();
    const newCart = [...cart.message, product.Name];

    // Update the user data in the API
    const updateResponse = await fetch(
      `http://localhost:3000/api/users?sub=${uid}&field=cart`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCart),
      }
    );

    if (updateResponse.ok) {
      setIsAdded(true);
      const Toast = Swal.mixin({
        toast: true,
        position: "top-right",
        iconColor: "white",
        customClass: {
          popup: "colored-toast",
        },
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
      });
      await Toast.fire({
        icon: "success",
        title: "Successfuly added to cart",
      });
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
              <Fab
                aria-label="add-to-cart"
                disabled={addedToCart || isAdded}
                onClick={addToCart}
              >
                {addedToCart || isAdded ? (
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
