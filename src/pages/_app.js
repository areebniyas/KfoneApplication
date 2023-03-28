import HomePage from './homePage';
// import Navbar from '../components/NavbarComponent/Navbar';
// import Footer from '../components/FooterComponent/Footer';
import Navbar from '../components/NavbarComponent/Navbar';
import Footer from '../components/FooterComponent/Footer';
import { SessionProvider } from "next-auth/react"
import '../styles/globals.css'
import '../styles/NavbarCSS.css'
import '../styles/FooterCSS.css'

export default function App({ Component, pageProps }) {

  const isAuthenticated = false; // or false, depending on the user's authentication status
  
  return (
    <>
    <SessionProvider session={pageProps?.session}>
      <Navbar isAuthenticated={isAuthenticated} />
    {/* <HomePage/> */}
      <Component {...pageProps} />
      <Footer/>
    </SessionProvider>
    </>
  )
}
