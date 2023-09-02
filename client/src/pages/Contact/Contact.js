import React from "react";
import Layout from "../../Component/Layout";
import img1 from "../Contact/contact_us.png";

import "./Contact.css";

const Contact = () => {
  return (
    <Layout title={"Contact us E-Commerce"}>
      <div className="contact">
        <div className="left">
          <h2>Contact Us </h2>
          Got questions or feedback? We're here to help. Reach out to us through
          any of these channels: Live Chat: Find the chat bubble icon on the
          bottom right of the screen for instant assistance. Email: Drop us a
          message at shoppad@support.com. Phone: Call us toll-free at
          1-800-123-4567. Social Media: Connect with us on Facebook, Twitter,
          and Instagram. We're here during the following hours: Mon-Fri: 9:00 AM
          - 8:00 PM (EST) Sat: 10:00 AM - 6:00 PM (EST) Sun: Closed Looking
          forward to assisting you! -The Shoppad Team
        </div>
        <div className="right">
          <img src={img1} alt="erro" />
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
