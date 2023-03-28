import Product from "./ServiceItems"
import { Grid } from "@mui/material"
import { Box } from "@mui/system";
import { useState, useEffect } from 'react';

function ServicesComponent() {

  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('http://localhost:3000/api/services');
      const json = await response.json();
      setData(json);
    }

    fetchData();
  }, []);

    if(!data) return null
    return (
      <Box className='display-box' sx={{ margin:'50px', display: 'flex', overflowX: 'scroll', scrollBehavior: 'smooth' }}>
          {/* <Grid container spacing={2}> */}
          {data.message.map((product) => (
            <Box sx={{ minWidth: 300, maxWidth: 300, marginRight: 2 }}>
              <Product key={product.Name} product={product} />
            </Box>
          ))}
          {/* </Grid> */}
      </Box>
    )
  }
  
export default ServicesComponent
  