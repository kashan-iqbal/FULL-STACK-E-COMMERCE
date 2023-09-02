import React from "react";
import { Link } from "react-router-dom";
import Layout from "../../Component/Layout";
import "./pagenotfound.css";

const Pagenotfound = () => {
  return (
    <Layout tittel={"Go-back (page not found 404)"}>
      <div className="cont">
        <div className="child_container">
          <h2>404</h2>
          <h3>Oops ! Page Not Found</h3>
          <p>
            <Link to="/" style={{ textDecoration: "none" }}>
              <button className="Btn" type="button">
                Go Back
              </button>
            </Link>
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Pagenotfound;
