import Link from 'next/link'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import logo from 'public/logo.svg';

const Navbar = () => {

  const user = null;
  return (
    !user ? (
      <nav className='navbar'>
        <ul className='navbar-links'>
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
        <img src={logo} alt='Logo' className='logo'/>
      </ul>
      </nav>
  ))
}

export default Navbar
