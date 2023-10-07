import { Select } from "antd";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import Adminmenu from "../../Component/Adminmenu";
import Layout from "../../Component/Layout";
import { useAuth } from "../../context/auth";

import "../users/order.css";
const AdminOrder = () => {
  const { Option } = Select;

  const [status] = useState([
    "Not Process",
    "Processing",
    "Shipped",
    "Delivered",
    "Cancel",
  ]);
  //   const [changeStatus, setChangeStatus] = useState("");
  const [orders, setOrders] = useState([]);
  const [auth] = useAuth();

  const getOrdersHandler = async () => {
    try {
      const { data } = await axios.get("/api/v1/auth/all-orders");
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrdersHandler();
  }, [auth?.token]);

  const handleChange = async (orderId, value) => {
    try {
      axios.put(`/api/v1/auth/order-status/${orderId}`, {
        status: value,
      });
      getOrdersHandler();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout title={"All Orders"}>
      <div className="container-fluid mt-5">
        <div className="row">
          <div className="col-md-3 px-4">
            <Adminmenu />
          </div>
          <div className="col-md-8 mx-3 px-3">
            <h1 className="text-center ">All Orders</h1>
            {orders.map((o, i) => {
              return (
                <div className="border shadow" key={i}>
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Status</th>
                        <th scope="col">Buyer</th>
                        <th scope="col">Date</th>
                        <th scope="col">Payment</th>
                        <th scope="col">Quantity</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{i + 1}</td>
                        <td>
                          <Select
                            bordered={false}
                            onChange={(value) => handleChange(o._id, value)}
                            defaultValue={o?.status}
                          >
                            {status?.map((s, i) => (
                              <Option key={i} value={s}>
                                {s}
                              </Option>
                            ))}
                          </Select>
                        </td>
                        <td>{o?.buyer?.name}</td>
                        <td>{moment(o?.createdAt).fromNow()}</td>
                        <td>{o?.payment?.success ? "Success" : "Failed"}</td>
                        <td>{o?.products?.length}</td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="container">
                    {o?.products?.map((p) => (
                      <div className="row mb-3 card flex-row" key={p._id}>
                        <div className="col-md-4">
                          <img
                            src={`/api/v1/products/product-photo/${p._id}`}
                            className="card-img-top"
                            alt={p.name}
                            height={"190xp"}
                            width={"70px"}
                          />
                        </div>
                        <div className="col-md-8 p-3">
                          <p> {p.name}</p>
                          <p> {p.description.substring(0, 30)}</p>
                          <p> Price: {p.price}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminOrder;
