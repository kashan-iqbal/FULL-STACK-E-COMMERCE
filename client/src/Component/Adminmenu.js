import React from "react";
import { Link } from "react-router-dom";
import "./Usermenu.css";
const Adminmenu = () => {
  return (
    <>
      <div className="text-center">
        <div className="list-group">
          <h4>Admin Panel</h4>
          <div id="list">
            <div className="btn">
              <Link
                to="/dashboard/admin/create-catageroy"
                className="list-group-item list-group-item-action"
                style={{ color: "black" }}
              >
                Create Category
              </Link>
            </div>
            <div className="btn">
              <Link
                to="/dashboard/admin/create-product"
                className="list-group-item list-group-item-action"
                style={{ color: "black" }}
              >
                Create Product
              </Link>
            </div>
            <div className="btn">
              <Link
                to="/dashboard/admin/products"
                className="list-group-item list-group-item-action"
                style={{ color: "black" }}
              >
                Products
              </Link>
            </div>
            <div className="btn">
              <Link
                to="/dashboard/admin/orders"
                className="list-group-item list-group-item-action"
                style={{ color: "black" }}
              >
                Orders
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Adminmenu;
