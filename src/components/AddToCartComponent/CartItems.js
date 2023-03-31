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
import LocalMallIcon from '@mui/icons-material/LocalMall';
import Payment from "./Payment";
import Link from 'next/link';
import { useRouter } from 'next/router';
// ES6 Modules or TypeScript
import Swal from "sweetalert2";
import { useSession } from "next-auth/react";


function CartProduct({ product, isLoggedIn, cart }) {
  const { data: session, status } = useSession();
  const [alreadyBought, setAlreadyBought] = useState(false);
  // const addToCart = () => {
  // };
  let uid = "";
  if(session != null)
  {
    uid = session.user["sub"];
  }
  const Swal = require("sweetalert2");


  const getPaymemtHistory = async() => {
    const updateResponse = await fetch(
      `http://localhost:3000/api/getUserAttr?sub=${uid}&field=purchases`
    );
    const updateResult = await updateResponse.json();
    // console.log("res", res)
    return updateResult
  }


  const handleClick = async() => {
    if (!session) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Please login to add to cart!",
      });
      return;
    }

    const payment = await getPaymemtHistory();
    const newPayment = [...payment.message, product.Name];

    // Update the user data in the API
    const updateResponse = await fetch(
      `http://localhost:3000/api/users?sub=${uid}&field=purchases`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPayment),
      }
    );
    if (updateResponse.ok) {
      setAlreadyBought(true);
      
      
      Swal.fire({
        icon: "success",
        title: "Success",
        text: `Product purchased successfully!`,
      });
      return;
    }
  }
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
              {!alreadyBought &&
              <Fab aria-label="buy" onClick={handleClick} >
                <LocalMallIcon />
              </Fab>}
            </CardActions>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default CartProduct;
