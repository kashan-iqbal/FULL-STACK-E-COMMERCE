import React from "react";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import Layout from "../../Component/Layout";
import { useCart } from "../../context/Cart";
import { useSearch } from "../../context/search";

const Search = () => {
  const [values] = useSearch();

  const [cart, setCart] = useCart();
  return (
    <Layout title={"Search-Products"}>
      <section id="products-header">
        <h2>#findbest</h2>
        <p>Save More with Coupons & upto 70% off</p>
      </section>
      <h2 style={{ marginTop: "4rem", textAlign: "center" }}>
        {values?.results.length < 1
          ? "No Product Found"
          : ` Total ${values?.results.length} Products`}
      </h2>
      <section id="product1_new" className="section-p1">
        <div className="proContainer_new ">
          {values.results?.map((p) => (
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
                    localStorage.setItem("cart", JSON.stringify([...cart, p]));
                    toast.success("Item added TO Cart");
                  }}
                >
                  <i className="fa fal fa-shopping-cart" />
                </Link>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </Layout>
  );
};

export default Search;
