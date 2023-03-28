import Product from "./Product"
import productsData from "../../data/sample-devices.json"
import { Grid } from "@mui/material"
import { Box } from "@mui/system";


function DisplayComponent() {
    return (
      <Box className='display-box' sx={{ margin:'50px', display: 'flex', overflowX: 'scroll', scrollBehavior: 'smooth' }}>
          {/* <Grid container spacing={2}> */}
          {productsData.map((product) => (
            // console.log("product:", product.Name),
            <Box key={product.Name} sx={{ minWidth: 300, maxWidth: 300, marginRight: 2 }}>
              <Product product={product} />
            </Box>
          ))}
          {/* </Grid> */}
      </Box>
    )
  }
  
export default DisplayComponent
