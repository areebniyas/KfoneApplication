import { useSession, getSession, signIn, signOut } from 'next-auth/react'
import Link from 'next/link'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Image from 'next/image';

const Navbar = () => {
  const { data: session, status } = useSession()
  const user = null;
  return (
    !user ? (
      <nav className='navbar'>
        <ul className='navbar-links'>
        <Image src='/logo.svg' alt="Logo" className='logo' width={104} height={168}/>
          <li>
            {
              session ? 
              (
                <button
                  className="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-deep-purple-accent-400 hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none"
                  aria-label="Sign out"
                  title="Sign out"
                  onClick={() => signOut({ callbackUrl: "http://localhost:3000/" })}
                >
                  Sign Out
                </button>
              ) :
              (
                <button
                  className="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-deep-purple-accent-400 hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none"
                  aria-label="Sign up"
                  title="Sign up"
                  onClick={() => signIn("asgardeo", { callbackUrl: "http://localhost:3000/" })}
                >
                  Sign In
                </button>
              )
            }
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
