import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Link  } from "react-router-dom";
import Adminmenu from "../../Component/Adminmenu";
import Layout from "../../Component/Layout";
import { useCart } from "../../context/Cart";
import {} from "./styles/style.css";
const Products = () => {
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [button, setButton] = useState(true);
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useCart();

  const getAllProducts = async () => {
    try {
      setButton(true);
      setLoading(true);
      const { data } = await axios.get(`/api/v1/products/product-list/1`);
      setLoading(false);
      setProducts(data?.products);
      setPage(1);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const getTotal = async () => {
    try {
      const { data } = await axios.get("/api/v1/products/product-count");
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTotal();
  }, []);

  const loadMore = async () => {
    try {
      setButton(true);
      setLoading(true);
      const { data } = await axios.get(`/api/v1/products/product-list/${page}`);
      setLoading(false);
      setProducts([...products, ...data?.products]);
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

  // initially get product
  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <Layout title={"Products"}>
      <section id="product1_new" className="section-p1 row m-0">
        <div className="col-md-3">
          <Adminmenu />
        </div>

        <div className="proContainer_new col-md-8">
          {products?.map((p) => (
            <Link
              to={`/dashboard/admin/update-product/${p.slug}`}
              style={{ width: "min-content" }}
              key={products._id}
            >
              <div className="pro flex-wrap" key={p._id}>
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
                <Link
                  onClick={() => {
                    setCart([...cart, p]);
                    localStorage.setItem("cart", JSON.stringify([...cart, p]));
                    toast.success("Item added TO Cart");
                  }}
                >
                  <i className="fa fal fa-shopping-cart" />
                </Link>
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
    </Layout>
  );
};

export default Products;
