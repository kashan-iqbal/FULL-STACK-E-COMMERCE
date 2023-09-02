import axios from "axios";
import DropIn from "braintree-web-drop-in-react";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../../Component/Layout";
import { useCart } from "../../context/Cart";
import { useAuth } from "../../context/auth";
import "./style.css";

const Cart = () => {
  const [auth] = useAuth();
  const [cart, setCart] = useCart();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);
  const Navigate = useNavigate();

  // cart price adding functionality
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => (total = total + item.price));
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    } catch (error) {
      console.log(error);
    }
  };

  // cart remove function
  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };

  // get payment get way token
  const getToken = async () => {
    try {
      const { data } = await axios.get("/api/v1/products/braintree/token");
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getToken();
  }, [auth?.token]);

  // make payment button
  const handelPayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      setTimeout(() => {
        toast.success("Order is Placed Successfully ✔");
      }, 1000);
      Navigate("/dashboard/user/orders");
      await axios.post("/api/v1/products/braintree/payment", {
        nonce,
        cart,
      });
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <Layout title={"Your Cart "}>
      <div>
        <section id="cart" className="section-p1">
          <h4 className="text-center mb-4">
            {cart?.length > 0
              ? `You Have ${cart.length} Item In Your Cart
    ${auth?.token ? "" : "plase login to checkout"}`
              : "Your Cart is Empty"}
          </h4>
          <table width="100%">
            <thead>
              <tr>
                <td>Remove</td>
                <td>Image</td>
                <td>Product</td>
                <td>Price</td>
                <td>Category</td>
                <td>Shipping</td>
              </tr>
            </thead>
            <tbody>
              {cart.map((p, i) => (
                <tr key={i}>
                  <td>
                    <Link onClick={() => removeCartItem(p._id)}>
                      <i className="far fa-times-circle" id="cross_icon" />
                    </Link>
                  </td>
                  <td>
                    <img
                      src={`/api/v1/products/product-photo/${p._id}`}
                      alt={p.name}
                    />
                  </td>
                  <td>{p.name}</td>
                  <td>${p.price}</td>
                  <td>Mens Wear</td>
                  <td>Free</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
        <section id="cart-add" className="section-p1">
          <div id="subtotal">
            <h3>Cart Summary</h3>
            <div className="d-flex flex-row my-4">
              {auth?.user?.address ? (
                <>
                  <h4> Current Address : &nbsp;</h4>
                  <h5> {auth?.user?.address}&nbsp;&nbsp;</h5>
                  <button
                    onClick={() => Navigate("/dashboard/user/profile")}
                    id="address_btn"
                  >
                    Update Address
                  </button>
                </>
              ) : (
                <>
                  {auth?.token ? (
                    <button onClick={() => Navigate("/dashboard/user/profile")}>
                      Update Address
                    </button>
                  ) : (
                    <button
                      onClick={() =>
                        Navigate("/login", {
                          state: "/cart",
                        })
                      }
                      id="p_login_btn"
                    >
                      Please Login to Checkout &nbsp;&#8594;
                    </button>
                  )}
                </>
              )}
            </div>
            <table className="w-50">
              <tbody>
                <tr>
                  <td>Products Price</td>
                  <td>{totalPrice()}</td>
                </tr>
                <tr>
                  <td>Shipping</td>
                  <td> Free</td>
                </tr>
                <tr>
                  <td>
                    <strong>Total Amount :</strong>
                  </td>
                  <td>
                    <strong> {totalPrice()} </strong>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {!clientToken || !cart?.length ? (
            ""
          ) : (
            <div className="payment_container ">
              <DropIn
                options={{
                  authorization: clientToken,
                  paypal: {
                    flow: "checkout",
                  },
                }}
                onInstance={(instance) => setInstance(instance)}
              />
              <button
                id="paynow_btn"
                onClick={handelPayment}
                disabled={!instance || !auth?.user?.address}
              >
                {loading ? "Processing...." : "Pay Now"}&nbsp;&nbsp; &#8594;
              </button>
            </div>
          )}
        </section>
      </div>
    </Layout>
  );
};

export default Cart;
