import { useSession, getSession, signIn, signOut } from 'next-auth/react'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Image from 'next/image';
import SendIcon from '@mui/icons-material/Send';
import { Button } from '@mui/material';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import LoyaltyIcon from '@mui/icons-material/Loyalty';
import SignOutButton from './SignOutButton';

const Navbar = () => {
  const { data: session, status } = useSession()
  const user = null;
  const [userName, setUserName] = useState()
  const [loyalty, setLoyalty] = useState()
  const [ points, setPoints] = useState()
  

  useEffect(() => {
    if (session) {

      async function getUserInfo() {
        const response = await fetch("http://localhost:3000/api/userInfo");
        const json = await response.json();
        setUserName("Hi, " + json.data.given_name)
        return json;
      }

      async function checkPoints(){

        const userDetails = await getUserInfo();
        const sub = userDetails.data["sub"];

        const response = await fetch(
          `http://localhost:3000/api/getUser?userId=${sub}`
        );
        const json = await response.json();
        
        if (json) {
          setPoints(json.message[0]["points"])
          
        }
      }
      checkPoints();
  }
  setLoyalty("Tier: Platinum")

  }, [])
  return (
    !user ? (
      <nav className='navbar'>
        <ul className='navbar-links'>
        <Image src='/logo.svg' alt="Logo" className='logo' width={104} height={168}/>
            {
              session ? 
              (
                <div style={{marginLeft:'10px'}}>
                  <SignOutButton></SignOutButton>
               <div><li>{userName}</li></div>
                <div className='loyalty'>
                  <li>{loyalty}<LoyaltyIcon className='LoyaltyIcon'/></li>
                </div>
               </div>
              ) :
              (
                <div style={{marginLeft:'10px'}}>
                <Button variant="outlined" endIcon={<SendIcon />} onClick={() => signIn("asgardeo", { callbackUrl: "http://localhost:3000/" })}>
                  Sign In
               </Button>
               </div>
              )
            }
        </ul>
      </nav>
    ) : (
      <nav className='navbar'>
      <ul className='navbar-links'>
      <Image src='/logo.svg' alt="Logo" className='logo' width={104} height={168}/>
           <li>
            <Link href="/account">
              <div><AccountCircleIcon/></div>
            </Link>
          </li>
           <li>
            <Link href="/logout">
              <div>LogOut</div>
            </Link>
          </li>
          
      </ul>
      </nav>
  ))
}

export default Navbar
