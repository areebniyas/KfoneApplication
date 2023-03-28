import { useSession, getSession, signIn, signOut } from 'next-auth/react'
import Link from 'next/link'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Image from 'next/image';
import SendIcon from '@mui/icons-material/Send';
import { Button } from '@mui/material';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const Navbar = () => {
  const { data: session, status } = useSession()
  const user = null;
  return (
    !user ? (
      <nav className='navbar'>
        <ul className='navbar-links'>
        <Image src='/logo.svg' alt="Logo" className='logo' width={104} height={168}/>
            {
              session ? 
              (
                <div style={{marginLeft:'10px'}}>
                <Button variant="outlined" endIcon={<ExitToAppIcon/>} onClick={() => signOut({ callbackUrl: "http://localhost:3000/" })}>
                  Sign Out
               </Button>
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
