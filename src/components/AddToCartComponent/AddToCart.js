import Product from "./CartItems";
import productsData from "../../data/sample-devices.json";
import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import users from "../../data/dummy_users.json";

function AddToCartComponent() {
  return (
    <Box
      className="display-box"
      sx={{
        margin: "50px",
        display: "flex",
        overflowX: "scroll",
        scrollBehavior: "smooth",
      }}
    >
      {/* <Grid container spacing={2}> */}
      {users[0]["cart"].map((productName) => {
        const product = productsData.find((p) => p.Name === productName);
        return (
          <Box
            key={product.Name}
            sx={{ minWidth: 300, maxWidth: 300, marginRight: 2 }}
          >
            <Product product={product} isLoggedIn={true} />
          </Box>
        );
      })}

      {/* </Grid> */}
    </Box>
  );
}

export default AddToCartComponent;
