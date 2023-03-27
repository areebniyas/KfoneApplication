import React from 'react';
import { Card, CardMedia, CardContent, Typography } from '@mui/material';
import image from '../../data/phone-img.png'

function Product({ product }){
  return (
    <Card sx={{ maxWidth:300, maxHeight:400}}>
      <CardMedia
        component="img"
        height="100"
        image={image}
        alt={product.Name}
      />
      <CardContent>
        <Typography variant="h6">{product.Name}</Typography>
        <Typography variant="h5">${product.Price}</Typography>
        <Typography variant="subtitle1">{product.Description}</Typography>
        <Typography variant="h5">{product.Manufacturer}</Typography>
      </CardContent>
    </Card>
  );
};

export default Product;
