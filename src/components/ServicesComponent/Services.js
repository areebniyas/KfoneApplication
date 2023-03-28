import Product from "./ServiceItems"
import productsData from "../../data/sample-services.json"
import { Grid } from "@mui/material"
import { Box } from "@mui/system";

function ServicesComponent() {
    return (
      <Box className='display-box' sx={{ margin:'50px', display: 'flex', overflowX: 'scroll', scrollBehavior: 'smooth' }}>
          {/* <Grid container spacing={2}> */}
          {productsData.map((product) => (
            <Box sx={{ minWidth: 300, maxWidth: 300, marginRight: 2 }}>
              <Product key={product.Name} product={product} />
            </Box>
          ))}
          {/* </Grid> */}
      </Box>
    )
  }
  
export default ServicesComponent
  