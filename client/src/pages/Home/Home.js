import { ShoppingCartOutlined } from "@ant-design/icons";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import Banner1 from "../../Component/Banner1/Banner1";
import BnrQform from "../../Component/BannerQeryform/bnrQform";
import Feature from "../../Component/Feature/Feature";
import Hero from "../../Component/Hero/Hero";
import Layout from "../../Component/Layout";
import { useCart } from "../../context/Cart";
import "./Home.css";

const Home = () => {
  const [products, setProduct] = useState([]);
  const [cart, setCart] = useCart();

  // get all product from backend
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(`/api/v1/products/get-product`);
      setProduct(data?.allProducts);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  // FUNCTION FOR DISPLAY ONLY 4 PRODUCT
  const limitedProduct = products.slice(0, 4);
  const newArrival = products.slice(4, 8);

  return (
    <Layout title={"Cora-Home"}>
      <Hero />
      <Feature />

      <section id="product1" className="section-p1">
        <h2>Feature Product</h2>
        <p>Summer Collection New Arival Desigin</p>
        <div className="proContainer">
          {limitedProduct.map((p) => (
            <Link to={`/product/${p.slug}`} key={p._id}>
              <div className="pro">
                <img
                  src={`/api/v1/products/product-photo/${p._id}`}
                  alt={p.name}
                />

                <div className="des">
                  <h5>{p.name}</h5>
                  <span>{p.description}</span>
                  <div className="start">
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                  </div>
                  <h4>${p.price}</h4>
                </div>
                <Link>
                  <ShoppingCartOutlined
                    className="fa fal fa-shopping-cart"
                    onClick={() => {
                      setCart([...cart, p]);
                      localStorage.setItem(
                        "cart",
                        JSON.stringify([...cart, p])
                      );
                      toast.success("Item added TO Cart");
                    }}
                  />
                </Link>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <Banner1 />
      {/* NEW ARRIVAL  */}
      <section id="product1" className="section-p1">
        <h2>New Arival</h2>
        <p>Summer Collection New Arival Desigin</p>
        <div className="proContainer">
          {newArrival.map((p) => (
            <Link to={`/product/${p.slug}`} key={p._id}>
              <div className="pro">
                <img
                  src={`/api/v1/products/product-photo/${p._id}`}
                  alt={p.name}
                />

                <div className="des">
                  <h5>{p.name}</h5>
                  <span>{p.description}</span>
                  <div className="start">
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                  </div>
                  <h4>${p.price}</h4>
                </div>
                <Link>
                  <ShoppingCartOutlined
                    className="fa fal fa-shopping-cart"
                    onClick={() => {
                      setCart([...cart, p]);
                      localStorage.setItem(
                        "cart",
                        JSON.stringify([...cart, p])
                      );
                      toast.success("Item added TO Cart");
                    }}
                  />
                </Link>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <BnrQform />
    </Layout>
  );
};

export default Home;
