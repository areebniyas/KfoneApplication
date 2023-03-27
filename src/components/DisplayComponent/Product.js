import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
} from "@mui/material";
import Button from "@mui/material/Button";
// import image from '/images/phone-img.png';
// import Box from '@mui/material/Box';
import Fab from "@mui/material/Fab";
// import AddIcon from '@mui/icons-material/Add';
// import EditIcon from '@mui/icons-material/Edit';
import FavoriteIcon from "@mui/icons-material/Favorite";

function Product({ product }) {
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
        <div>
          <Typography variant="h6" sx={{ marginBottom: 1 }}>
            {product.Name}
          </Typography>
          <Typography variant="h5" sx={{ marginBottom: 1 }}>
            ${product.Price}
          </Typography>
          <Typography variant="subtitle1" sx={{ overflow: 'hidden', marginBottom: 1, maxWidth: '300px', whiteSpace: 'nowrap'}}>
            {product.Description}
          </Typography>
          <Typography variant="h5" sx={{ marginBottom: 1 }}>
            {product.Manufacturer}
          </Typography>
          <CardActions>
            <Fab disabled aria-label="like">
              <FavoriteIcon />
            </Fab>
          </CardActions>
        </div>
      </CardContent>
    </Card>
  );
}

export default Product;
