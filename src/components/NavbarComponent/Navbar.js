import Link from 'next/link'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Image from 'next/image';

const Navbar = () => {

  const user = null;
  return (
    !user ? (
      <nav className='navbar'>
        <ul className='navbar-links'>
        <Image src='/logo.svg' alt="Logo" className='logo' width={104} height={168}/>
          <li>
            <Link href="/signin">
              <div>SignIn</div>
            </Link>
          </li>
          <li>
            <Link href="/signup">
              <div>SignUp</div>
            </Link>
          </li>
          
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
