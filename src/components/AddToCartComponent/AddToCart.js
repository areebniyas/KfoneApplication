import Product from "./CartItems";
import productsData from "../../data/sample-devices.json";
import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import users from "../../data/dummy_users.json";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

function AddToCartComponent() {
  // const [session, setSession] = useSession();
  // console.log("AddtoCartComponent, ", cart)
  const { data: session, status } = useSession();
  const [cart, setCart] = useState([])
  const uid = session.user["sub"];

  useEffect(() => {
    // const data = fetch("http://localhost:3000/api/");

    // const res = fetch("http://localhost:3000/api/getUser");
    // const json = res.json();
    // console.log("json:", json);
    async function fetchData() {
      const updateResponse =  await fetch(
        `http://localhost:3000/api/getUserAttr?sub=${uid}&field=cart`
      );

      console.log("await", updateResponse);
      const updateResult = await updateResponse.json();
      setCart(updateResult.message)
      console.log("update", updateResult);
    }
    fetchData();
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
      {console.log("here is the cart", cart)}
      {cart.map((productName) => {
        console.log("product name", productName);
        const product = productsData.find((p) => p.Name === productName);
        console.log("Product", product);
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
