import Product from "./CartItems";
import productsData from "../../data/sample-devices.json";
import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import users from "../../data/dummy_users.json";
import { useEffect } from "react";
import { useSession } from "next-auth/react";

function AddToCartComponent(cart) {
  // const [session, setSession] = useSession();
  // console.log("AddtoCartComponent, ", cart)


  useEffect(() => {
    // const data = fetch("http://localhost:3000/api/");

    // const res = fetch("http://localhost:3000/api/getUser");
    // const json = res.json();
    // console.log("json:", json);

  }, []);
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
      {JSON.parse(cart.cart).map((productName) => {
        console.log("product name", productName)
        const product = productsData.find((p) => p.Name === productName);
        console.log("Product", product)
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
