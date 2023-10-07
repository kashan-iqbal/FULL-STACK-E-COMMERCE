import { Checkbox, Radio } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import Layout from "../../Component/Layout";
import { prices } from "../../Component/Prices";
import { useCart } from "../../context/Cart";
import "./style.css";

const ShopPage = () => {
  const [products, setProduct] = useState([]);
  const [catageory, setCatageory] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [cart, setCart] = useCart();
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [button, setButton] = useState(true);

  const getTotal = async () => {
    try {
      const { data } = await axios.get("/api/v1/products/product-count");
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  // get all catagers items from backend
  const getAllCatagers = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/category");
      if (data?.success) {
        setCatageory(data.allCategories);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCatagers();
    getTotal();
  }, []);

  const loadMore = async () => {
    try {
      setButton(true);
      setLoading(true);
      const { data } = await axios.get(`/api/v1/products/product-list/${page}`);
      setLoading(false);
      setProduct([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
    // eslint-disable-next-line
  }, [page]);

  // get all product from backend
  const getAllProducts = async () => {
    try {
      setButton(true);
      setLoading(true);
      const { data } = await axios.get(`/api/v1/products/product-list/1`);
      setLoading(false);
      setProduct(data?.products);
      setPage(1);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
    // eslint-disable-next-line
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) {
      setProduct(null);
      filterProduct();
    }
    // eslint-disable-next-line
  }, [checked, radio]);

  // filter by category

  const handlerFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  // get filter product from backend
  const filterProduct = async () => {
    try {
      const { data } = await axios.post("/api/v1/products/product-filters", {
        checked,
        radio,
      });
      setButton(false);
      console.log(data?.products);
      setProduct(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title={"All-Products"}>
      <section id="products-header">
        <h2>#Stay home</h2>
        <p>Save More with Coupons & upto 70% off</p>
      </section>
      <h2
        id="up"
        style={{ marginTop: "4rem", textAlign: "center", fontWeight: "600" }}
      >
        All Products
      </h2>

      <section id="product1_new" className="section-p1">
        <div className="filters ">
          <h2
            style={{ marginTop: "2.5rem", textAlign: "center" }}
            className="filterHeading"
          >
            Filters
          </h2>
          <div className=" mt-5 p-2 ">
            {/*                    filter by price                 */}
            <div id="filter_container">
              <div id="filter_catageory">
                <h4
                  className="mt-5"
                  style={{ color: "#088178", fontWeight: 600 }}
                >
                  Filter By catageory
                </h4>
                <div className="d-flex flex-column ">
                  {catageory?.map((c) => (
                    <Checkbox
                      key={c._id}
                      onChange={(e) => handlerFilter(e.target.checked, c._id)}
                      style={{
                        color: "#858992",
                        fontWeight: 600,
                        marginBottom: ".2rem",
                        fontSize: "1rem",
                      }}
                    >
                      {c.name}
                    </Checkbox>
                  ))}
                </div>
              </div>

              <div id="filter_price">
                <h4
                  className=" mt-5"
                  style={{ color: "#088178", fontWeight: 600 }}
                >
                  Filter By price
                </h4>
                <div className="d-flex flex-column ">
                  <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                    {prices?.map((p) => (
                      <div key={p.id} style={{ width: "max-content" }}>
                        <Radio
                          value={p.array}
                          style={{ color: "#858992", fontWeight: 600 }}
                        >
                          {p.name}
                        </Radio>
                      </div>
                    ))}
                  </Radio.Group>
                </div>
              </div>
            </div>

            <div className="d-flex flex-column ">
              <button
                className="reset_filters"
                onClick={() => window.location.reload()}
              >
                Reset Filters
              </button>
            </div>
          </div>
        </div>
        <h2
          id="down"
          style={{ marginTop: "4rem", textAlign: "center", fontWeight: "600" }}
        >
          All Products
        </h2>
        {/* ===============PRODUCT CARD============== */}
        <div className="proContainer_new ">
          {products?.map((p) => (
            <Link
              to={`/product/${p.slug}`}
              key={p._id}
              style={{ width: "min-content" }}
            >
              <div className="pro">
                <img
                  src={`/api/v1/products/product-photo/${p._id}`}
                  alt={p.name}
                />
                <div className="des">
                  <h5>{p.name}</h5>
                  <div className="start">
                    <i className="fas fa-star" />
                    <i className="fas fa-star" />
                    <i className="fas fa-star" />
                    <i className="fas fa-star" />
                    <i className="fas fa-star" />
                  </div>
                  <h4>$ {p.price}</h4>
                </div>
                <div
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setCart([...cart, p]);
                    localStorage.setItem("cart", JSON.stringify([...cart, p]));
                    toast.success("Item added TO Cart");
                  }}
                >
                  <i className="fa fal fa-shopping-cart" />
                </div>
              </div>
            </Link>
          ))}
          <div className="mx-auto btn_load">
            {button && products && products.length < total && (
              <button
                className="pagination_btn "
                onClick={(e) => {
                  e.preventDefault();
                  setPage((prev) => prev + 1);
                }}
              >
                {loading ? "Loading ......" : "LoadMore"}
              </button>
            )}
          </div>
        </div>
      </section>
      <section id="pagination"></section>
    </Layout>
  );
};

export default ShopPage;
