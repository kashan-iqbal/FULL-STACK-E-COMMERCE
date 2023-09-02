import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Layout from "../../Component/Layout";
import Usermenu from "../../Component/Usermenu";
import { useAuth } from "../../context/auth";
import "./profile.css";

const Profile = () => {
  // context
  const [auth, setAuth] = useAuth();

  // State
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  // const [password, setpassword] = useState("");
  const [phone, setphone] = useState("");
  const [address, setaddress] = useState("");

  // get user data
  useEffect(() => {
    const { email, name, phone, address } = auth.user;
    setname(name);
    setemail(email);
    setphone(phone);
    //  setpassword(password)
    setaddress(address);
  }, [auth?.user]);

  //form submit
  const submintHandler = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.put("/api/v1/auth/profile", {
        name,
        email,
        phone,
        address,
      });
      if (data?.error) {
        toast.error(data?.error);
      } else {
        setAuth({ ...auth, user: data?.updatedUser });
        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls.user = data.updatedUser;
        localStorage.setItem("auth", JSON.stringify(ls));
        toast.success("user profile is updated successfully");
      }
    } catch (error) {
      toast.error("Some thing went wrong");
    }
  };

  return (
    <Layout title={"User Profile"}>
      <div className="container-fluid " id="userp-controller">
        <div className="row">
          <div className="col-md-3 p-3 m-3">
            <Usermenu />
          </div>
          <div className="col-md-8 p-3 m-3">
            <div className="form-containerpr ">
              <form
                id="register_form"
                onSubmit={submintHandler}
                style={{ background: "none" }}
              >
                <h4 className="title">User Profile</h4>

                <div className="mb-3 register_margin">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setname(e.target.value)}
                    className="form-control"
                    placeholder="Enter Your Name"
                  />
                </div>

                <div className="mb-3 register_margin">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setemail(e.target.value)}
                    className="form-control"
                    id="exampleInputEmail1"
                    placeholder="Enter Your Email"
                    disabled
                  />
                </div>

                <div className="mb-3 register_margin">
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setaddress(e.target.value)}
                    className="form-control"
                    id="exampleInputEmail1"
                    placeholder="Enter Your Adress "
                  />
                </div>
                <div className="mb-3 register_margin">
                  <input
                    type="number"
                    value={phone}
                    onChange={(e) => setphone(e.target.value)}
                    className="form-control"
                    id="exampleInputEmail1"
                    placeholder="Enter Your Phone "
                  />
                </div>

                <div className="mb-3 register_margin">
                  <button type="submit" className="btn btn-primary">
                    Update Now
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
