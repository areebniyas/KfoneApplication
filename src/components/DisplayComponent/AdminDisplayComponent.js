import Product from "./Product";
import productsData from "../../data/sample-devices.json";
import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import { useState, useEffect } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
// import CommentIcon from '@mui/icons-material/Comment';
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function AdminDisplayComponent() {
  const [data, setData] = useState(null);

  const editProduct = () => {
    console.log("edit product");
  };
  useEffect(() => {
    async function fetchData() {
      const response = await fetch("http://localhost:3000/api/devices");
      const json = await response.json();
      setData(json);
    }

    fetchData();
  }, []);

  if (!data) return null;
  return (
    <div style={{marginLeft:"100px", marginTop:'40px'}}>
    <TextField id="outlined-search" label="Search field" type="search" />
    <Button className='btn-services' style={{marginLeft:'20px'}}>Add Device</Button>
    <List
      sx={{
        width: "100%",
        maxWidth: 400,
        bgcolor: "grey",
        marginTop: "40px",
      }}
    >
     
      {data.message.map((prodcut) => (
        <ListItem
          key={prodcut._id}
          disableGutters
          secondaryAction={
            <IconButton aria-label="comment">
              <EditIcon onClick={editProduct} />
            </IconButton>
          }
        >
          <ListItemText primary={`${prodcut.Name}`} sx={{ ml: "5px" }} />
        </ListItem>
      ))}
    </List>
    </div>
  );
}

export default AdminDisplayComponent;
