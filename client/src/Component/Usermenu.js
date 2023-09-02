import React from "react";
import { Link } from "react-router-dom";
import "./Usermenu.css";
const Usermenu = () => {
  return (
    <>
      <div className="text-center">
        <div className="list-group">
          <h4>User Pannel</h4>
          <div id="list">
            <div className="btn">
              <Link
                to="/dashboard/user/profile"
                className="list-group-item list-group-item-action "
                style={{ color: "black", padding: "1rem" }}
              >
                Update Profile
              </Link>
            </div>
            <div className="btn">
              <Link
                to="/dashboard/user/orders"
                className="list-group-item list-group-item-action"
                style={{ color: "black", padding: "1rem" }}
              >
                Your Orders
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Usermenu;
