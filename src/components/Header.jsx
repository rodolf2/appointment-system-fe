import "../styles/Header.css";

const Header = () => {
  return (
    <div>
      <div className="container">
        <section>
          <img src="/image/LOGO.png" alt="LOGO" className="logo" />
          <h1 className="name">
            LVCC <span>AppointEase</span>
          </h1>
        </section>

        <nav>
          <ul className="nav">
            <li>HOME</li>
            <li>CONTACTS</li>
            <li>FAQS</li>
            <li className="active">ABOUT</li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Header;
