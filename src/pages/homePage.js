import DisplayComponent from "../components/DisplayComponent/Display";
import ServicesComponent from "../components/ServicesComponent/Services";
import AddToCartComponent from "../components/AddToCartComponent/AddToCart";
import { useEffect, useState, useRef } from "react";
import { Icon } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import ButtonGroup from "@mui/material/ButtonGroup";
import { useSession } from "next-auth/react";

function HomePage() {
  const [activeButton, setActiveButton] = useState("display");
  const [cart, setCart] = useState([]);
  const {data:session, status} = useSession();

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  // post user details
  const dataFetchedRef = useRef(false);

  useEffect(() => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;

    async function getUserInfo() {
      const response = await fetch("http://localhost:3000/api/userInfo");
      const json = await response.json();
      return json;
    }

    async function postUser(userDetails) {
      const response = await fetch("http://localhost:3000/api/users", {
        method: "POST",
        body: JSON.stringify({
          username: userDetails.data["username"],
          sub: userDetails.data["sub"],
          family_name: userDetails.data["family_name"],
          given_name: userDetails.data["given_name"],
          cart: [],
          favourites: [],
          points: 0,
        }),
      });
    }

    async function checkUser(sub) {
      const response = await fetch(
        `http://localhost:3000/api/getUser?userId=${sub}`
      );
      const data = await response.json();
      return data;
    }

    async function fetchData() {
      const userDetails = await getUserInfo();
      const dbDetails = await checkUser(userDetails.data["sub"]);
      if (dbDetails.message.length > 0) {
        setCart(dbDetails.message[0]["cart"]);
        return;
      }
      postUser(userDetails);
    }

    if (session) {
      fetchData();
    }
    
  }, []);

  const buttons = [
    <Button
      className="btn-services"
      onClick={() => handleButtonClick("display")}
    >
      Display
    </Button>,
    <Button
      className="btn-services"
      onClick={() => handleButtonClick("services")}
    >
      Services
    </Button>,
    <Button
      className="btn-services"
      onClick={() => handleButtonClick("add-to-cart")}
    >
      <Icon className="icon-services">
        {" "}
        <ShoppingCartIcon />{" "}
      </Icon>
    </Button>,
  ];

  let content = null;

  switch (activeButton) {
    case "display":
      content = <DisplayComponent cart={cart}/>;
      break;
    case "services":
      content = <ServicesComponent/>;
      break;
    case "add-to-cart":
      content = <AddToCartComponent/>;
      break;
    default:
      content = null;
  }

  return (
    <div className="div-services">
      <div className="btn-services-container">
        {session &&
        <ButtonGroup aria-label="medium secondary button group">
          {buttons}
        </ButtonGroup>
      }
      </div>
      <div className="content-container">{content}</div>
    </div>
  );
}

export default HomePage;
