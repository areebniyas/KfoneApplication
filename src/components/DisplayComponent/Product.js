import React from "react";
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
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

function Product({ product }) {
  const addToCart = () => {
    console.log("Added to cart");
  };
  return (
    <Card sx={{ width: 300, height: 600, position:'relative' }}>
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
        <div style={{width:'95%'}}>
          <Typography variant="h6" sx={{ marginBottom: 1 }}>
            {product.Name}
          </Typography>
          <Typography variant="h5" sx={{ marginBottom: 1 }}>
            ${product.Price}
          </Typography>
          <Typography variant="subtitle1" sx={{ overflow: 'hidden', marginBottom: 1, maxWidth: '300px', whiteSpace: 'nowrap'}}>
            {product.Description}
          </Typography>
          <Typography variant="h5" sx={{ marginBottom: 3 }}>
            {product.Manufacturer}
          </Typography>
          <CardActions>
            {/* <Fab aria-label="like">
              <FavoriteIcon />
            </Fab> */}
            <Fab aria-label="like" style={{marginRight:'125px'}}>
              <FavoriteBorderIcon/>
            </Fab>
            <Fab aria-label="add-to-cart" onClick={addToCart}>
              <AddShoppingCartIcon />
            </Fab>
          </CardActions>
        </div>
      </CardContent>
    </Card>
  );
}

export default Product;
