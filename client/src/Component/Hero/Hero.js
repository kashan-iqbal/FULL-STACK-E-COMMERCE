import React from "react";
import { useNavigate } from "react-router-dom";
import "./Style.css";

const Hero = () => {
  const Navigate = useNavigate();
  return (
    <>
      <section id="hero">
        <h4>Trade-in-offfer</h4>
        <h2>Super value deals</h2>
        <h1>On all products</h1>
        <p>Save More with Coupons & upto 70% off</p>
        <button onClick={() => Navigate("all-products")}>Shop Now</button>
      </section>
    </>
  );
};

export default Hero;
