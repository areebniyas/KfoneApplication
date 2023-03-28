import HomePage from './homePage';
import Navbar from '@/components/NavbarComponent/Navbar';
import Footer from '@/components/FooterComponent/Footer';
import '@/styles/globals.css'
import '@/styles/NavbarCSS.css'
import '@/styles/FooterCSS.css'


export default function App({ Component, pageProps }) {

  const isAuthenticated = true; // or false, depending on the user's authentication status
  
  return (
    <>
    <Navbar isAuthenticated={isAuthenticated} />
    {/* <HomePage/> */}
    {/* <Footer/> */ }
    <Component {...pageProps} />
    </>
  )
}
