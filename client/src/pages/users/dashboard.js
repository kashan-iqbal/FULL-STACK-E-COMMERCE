import React from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../Component/Layout";
import Usermenu from "../../Component/Usermenu";
import { useAuth } from "../../context/auth";
import "./dasboard.css";

const Dashboard = () => {
  const [auth] = useAuth();
  const Navigate = useNavigate();
  return (
    <Layout title={"User Dashboard"}>
      <div
        className="container-fluid"
        style={{ height: "fit-content" }}
        id="dash-controller"
      >
        <div className="row">
          <div className="col-md-3  mt-3">
            <Usermenu />
          </div>
          <div className="col-md-8 p-3 " id="full_box">
            <div className="card mb-4">
              <div className="card-body">
                <div className="row">
                  <h3
                    className="text-center"
                    style={{
                      color: "#088178",
                      fontWeight: 600,
                      marginTop: "1rem",
                    }}
                  >
                    Your Information
                  </h3>
                  <div className="col-sm-3">
                    <p className="mb-0">Full Name</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">{auth?.user?.name}</p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Email</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">{auth?.user?.email}</p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Phone</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">{auth?.user?.phone}</p>
                  </div>
                </div>
                <hr />

                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Address</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">{auth?.user?.address}</p>
                  </div>
                </div>
                <button
                  className="pagination_btn mx-auto w-25 mt-5 d-flex justify-content-center"
                  onClick={() => Navigate("/dashboard/user/profile")}
                >
                  Edit Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
