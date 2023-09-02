import React from "react";
import { f1, f2 ,f3,f4,f5,f6} from "../../img";


import "./Style.css";

const Feature = () => {
  return (
    <>
      <section id="feature" className="section-p1">
        <div className="fe-box">
          <img src={f1} alt="" />
          <h6>Free shipping</h6>
        </div>
        <div className="fe-box">
          <img src={f2} alt="" />
          <h6>Online Order</h6>
        </div>
        <div className="fe-box">
          <img src={f3} alt="" />
          <h6>Save Money</h6>
        </div>
        <div className="fe-box">
          <img src={f4} alt="" />
          <h6>Promotion</h6>
        </div>
        <div className="fe-box">
          <img src={f5} alt="" />
          <h6>Happy Sell</h6>
        </div>
        <div className="fe-box">
          <img src={f6} alt="" />
          <h6>F24/7Suppport</h6>
        </div>
      </section>
    </>
  );
};

export default Feature;
