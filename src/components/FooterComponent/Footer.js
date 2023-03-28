import Link from 'next/link'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <nav>
          <ul className="navLinks">
            <li>
              <Link href="/">
                <div>Home</div>
              </Link>
            </li>
            <li>
              <Link href="/about">
                <div>About</div>
              </Link>
            </li>
            <li>
              <Link href="/contact">
                <div>Contact</div>
              </Link>
            </li>
          </ul>
        </nav>
        <p className="copyRight">© 2023 Your Company. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
