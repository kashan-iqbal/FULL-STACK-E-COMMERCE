import React from "react";
import { Link } from "react-router-dom";
import { app, logo, pay, play } from "../img";
import "./footer.css";

const Footer = () => {
  return (
    <>
      <footer className="section-p1">
        <div className="col1">
          <img src={logo} alt="ok" />
          <p>
            <strong>Address:</strong> Street 123 Karachi Pakistan
          </p>
          <p>
            <strong>Phone:</strong> +92 1020304050
          </p>
          <p>
            <strong>Days:</strong> Mon-Sat
          </p>
          <div className="follow">
            <h4>Follow Us</h4>
            <div className="icon">
              <i className="fab fa-facebook-f" />
              <i className="fab fa-twitter" />
              <i className="fab fa-instagram" />
              <i className="fab fa-pinterest-p" />
              <i className="fab fa-youtube" />
            </div>
          </div>
        </div>

        <div className="col1">
          <h4>About</h4>
          <p>
            <Link to="/">About Us</Link>
          </p>
          <p>
            <Link to="/dashboard/user/orders">Delivery Information</Link>
          </p>
          <p>
            <Link to="/">Privicy &amp; Policy</Link>
          </p>
          <p>
            <Link to="/">Contact Us</Link>
          </p>
        </div>

        <div className="col1">
          <h4>My Account</h4>
          <p>
            <Link to="/login">Sign In</Link>
          </p>
          <p>
            <Link to="/cart">View Cart</Link>
          </p>
          <p>
            <Link to="/dashboard/user">My Profile</Link>
          </p>
          <p>
            <Link to="/dashboard/user/orders">Track My Order</Link>
          </p>
          <p>
            <Link to="/">Help</Link>
          </p>
        </div>
        <div className="col install">
          <h4>Install App</h4>
          <p>Form App Store or Google Play</p>
          <div className="footer-row row">
            <img src={app} alt="ok" />
            <img src={play} alt="ok" />
          </div>
          <p>Payment Gateway</p>
          <img src={pay} alt="ok" />
        </div>
        <div className="copyright">
          <hr />
          <p>
            E-Commerce App and all related logos are trademarks of E-Commerce.
            All other trademarks and copyrights are the property of their
            respective owners.
          </p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
