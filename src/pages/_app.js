import '@/styles/globals.css'
import Navbar from '@/components/NavbarComponent/Navbar';
import '@/styles/NavbarCSS.css'

export default function App({ Component, pageProps }) {

  const isAuthenticated = true; // or false, depending on the user's authentication status
  
  return (
    <>
    <Navbar isAuthenticated={isAuthenticated} />
    <Component {...pageProps} />
    </>
  )
}
