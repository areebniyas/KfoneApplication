import Product from "./CartItems";
import productsData from "../../data/sample-devices.json";
import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import users from "../../data/dummy_users.json";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

function AddToCartComponent() {
  const { data: session, status } = useSession();
  const [cart, setCart] = useState([])
  let uid = "";
  if (session) {
    uid = session.user.sub;
  }

  useEffect(() => {
    async function fetchData() {
      const updateResponse =  await fetch(
        `http://localhost:3000/api/getUserAttr?sub=${uid}&field=cart`
      );

      const updateResult = await updateResponse.json();
      setCart(updateResult.message)
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

      {
        cart.map((productName) => {
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
    </Box>
  );
}

export default AddToCartComponent;
