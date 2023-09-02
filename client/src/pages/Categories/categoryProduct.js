import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Link, useParams } from "react-router-dom";
import Layout from "../../Component/Layout";
import { useCart } from "../../context/Cart";
import "./category.css";

const CategoryProduct = () => {
  const params = useParams();

  useEffect(() => {
    if (params.slug) getProductByCatHandler();
    // eslint-disable-next-line
  }, [params.slug]);

  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [cart, setCart] = useCart();

  const getProductByCatHandler = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/products/product-category/${params.slug}`
      );
      setProducts(data?.products);
      setCategory(data?.category);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title={"Category Wise Products"}>
      <section id="products-header">
        <h2>#explorenow</h2>
        <p>Dont Forget to Add Your Favourite Item in Cart</p>
      </section>
      <div className="container mt-3">
        <div>
          <h4 className="text-center" id="cp2_name">
            <span className="spanner">Category /</span>{" "}
            {category.name !== undefined && `${category?.name} `}
          </h4>
          <div className="row mt-5">
            <h2 className="ct_tot"> {products.length} Products Found</h2>
            <div className="d-flex flex-wrap ">
              <br />
            </div>
          </div>
          <div id="product1_new">
            {products?.map((p) => (
              <Link to={`/product/${p.slug}`} style={{ width: "min-content" }}>
                <div className="pro" key={p._id}>
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
                      localStorage.setItem(
                        "cart",
                        JSON.stringify([...cart, p])
                      );
                      toast.success("Item added TO Cart");
                    }}
                  >
                    <i className="fa fal fa-shopping-cart" />
                  </Link>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CategoryProduct;
