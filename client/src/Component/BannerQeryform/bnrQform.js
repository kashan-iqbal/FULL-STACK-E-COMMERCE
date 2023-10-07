import React from "react";
import { Link } from "react-router-dom";
import "./Style.css";

const BnrQform = () => {
  return (
    <>
      <section id="sm-banner" className="section-p1">
        <div className="banner-box">
          <h4>Creazy Deal</h4>
          <h2>Buy 1 Get One Free</h2>
          <span>The Best classNameic Dress is on Sale at zara </span>
          <Link className="white" to={"all-products"}>
            learn more
          </Link>
        </div>

        <div className="banner-box banner-box2">
          <h4>Super Deals</h4>
          <h2>Buy 1 Get One Free</h2>
          <span>The Best Dress is on Sale at zara </span>
          <Link className="white" to={"all-products"}>
            learn more
          </Link>
        </div>
      </section>

      <section className="newsletter section-m1 section-p1">
        <div className="newstext">
          <h4>Sign in for Newsletter</h4>
          <p>
            Get email update about our latest shop and &nbsp;
            <span>Special Offers</span>
          </p>
        </div>
        <div className="form">
          <input type="text" placeholder="ENTER YOUR E-MAIL" />
          <button className="normal">Sign Up</button>
        </div>
      </section>
    </>
  );
};

export default BnrQform;
