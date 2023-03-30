import Product from "./Product"
import productsData from "../../data/sample-devices.json"
import { Grid } from "@mui/material"
import { Box } from "@mui/system";
import { useState, useEffect } from 'react';
import { useSession } from "next-auth/react";

function DisplayComponent(cart) {
  const [data, setData] = useState(null);
  const { data: session, status } = useSession();
  const [addedToCart, setAddedToCart] = useState(false)
  console.log("display cart", cart)

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('http://localhost:3000/api/devices', {
        method: 'GET',
      });
      const json = await response.json();
      setData(json);
    }

    fetchData();
    
  }, []);

  if(!data) return null
    return (
      <>
      {/* {localStorage.setItem("cart", JSON.stringify(cart))} */}
      {/* {console.log(JSON.parse(cart))} */}
      <Box className='display-box' sx={{ margin:'50px', display: 'flex', overflowX: 'scroll', scrollBehavior: 'smooth' }}>
          {/* <Grid container spacing={2}> */}
          {data.message.map((product) => (
            <Box key={product._id} sx={{ minWidth: 300, maxWidth: 300, marginRight: 2 }}>
              <Product product={product} isLoggedIn={true} addedToCart={cart.cart.includes(product.Name)} cart={cart} />
            </Box>
          ))}
          {/* </Grid> */}
      </Box>
      </>
    )
  }
  
export default DisplayComponent
