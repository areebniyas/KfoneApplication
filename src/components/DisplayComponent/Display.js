import Product from "./Product"
import productsData from "../../data/sample-devices.json"
import { Grid } from "@mui/material"
import { Box } from "@mui/system";
import { useState, useEffect } from 'react';

function DisplayComponent() {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('http://localhost:3000/api/devices');
      const json = await response.json();
      console.log("json:", json)
      setData(json);
    }

    fetchData();
  }, []);

  if(!data) return null
    return (
      <Box className='display-box' sx={{ margin:'50px', display: 'flex', overflowX: 'scroll', scrollBehavior: 'smooth' }}>
          {/* <Grid container spacing={2}> */}
          {data.message.map((product) => (
            <Box key={product._id} sx={{ minWidth: 300, maxWidth: 300, marginRight: 2 }}>
              <Product product={product} isLoggedIn={true} />
            </Box>
          ))}
          {/* </Grid> */}
      </Box>
    )
  }
  
export default DisplayComponent
