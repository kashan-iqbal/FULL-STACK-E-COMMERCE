import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Layout from "../../../Component/Layout";
import "../Register/Register.css";

const ForgotPassword = () => {
  const navigate = useNavigate();

  //states
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [answer, setAnswer] = useState("");

  //om submit
  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("/api/v1/auth/forgot-password", {
        email,
        answer,
        newPassword,
        confirmPassword,
      });

      if (res.data.success) {
        setTimeout(() => {
          toast.success(res.data.message);
        }, 20);
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error("Some thing went wrong");
    }
  };

  return (
    <Layout title="Forgot Password ">
      <div className="form-container ">
        <form id="forgot_form" onSubmit={submitHandler}>
          <h4 className="title"> Forgot Password</h4>

          <div className="mb-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter Your Email "
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Your Favourite Sports"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Enter New Password"
              required
              minLength={6}
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Confirm your Password"
              required
              minLength={6}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Forgot Now
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default ForgotPassword;
