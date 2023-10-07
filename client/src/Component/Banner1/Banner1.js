import React from "react";
import { useNavigate } from "react-router-dom";
import "./Style.css";
const Banner1 = () => {
  const Navigate = useNavigate();
  return (
    <>
      <section id="banner" className="section-m1">
        <h4>Repair Service</h4>
        <h2>
          Upto <span> 70% Off </span> to all T-Shirt and Accessories
        </h2>
        <button className="normal" onClick={() => Navigate("/all-products")}>
          Explore More
        </button>
      </section>
    </>
  );
};

export default Banner1;
