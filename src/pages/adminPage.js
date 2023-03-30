import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import ServicesComponent from "../components/ServicesComponent/Services";
import AdminDisplayComponent from "../components/DisplayComponent/AdminDisplayComponent";
import AdminOnlyPage from "../components/DisplayComponent/AdminOnlyPage";

function AdminPage() {
  const { data: session, status } = useSession();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    async function checkUser() {
      const response = await fetch("http://localhost:3000/api/userInfo");
      const json = await response.json();

      try {
        if (json.data["groups"].includes("admin")) {
          setIsAdmin(true);
        } else {
          console.log("No groups found");
        }
        return JSON.stringify(json);
      } catch (error) {
        console.log("ERROR " + error);
      }
    }
    const userdetails = checkUser();
    console.log("USER DETAILS   " + userdetails);
  }, []);

  return isAdmin ? (
    <div>YOU ARE AN ADMIN!!!</div>
  ) : (
    <div>You need admin privileges to view this page</div>
  );
}

export default AdminPage;
