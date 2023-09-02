import { Badge } from "antd";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SearchForm from "../Component/form/SearchForm";
import { useCart } from "../context/Cart";
import { useAuth } from "../context/auth";
import useCategory from "../hooks/useCategory";
import { logo } from "../img";
import "./header.css";

const Header = () => {
  const Navigate = useNavigate();
  const location = useLocation();
  const [auth, setAuth] = useAuth();
  const [open, setOpen] = useState(false);
  const [cart] = useCart();
  const categories = useCategory();

  const handleLogout = () => {
    setAuth({ ...auth, user: null, token: "" });
    localStorage.removeItem("auth");
    setTimeout(() => {
      toast.success("Logout Succesfully");
      Navigate("/");
    }, 50);
  };

  return (
    <section id="header">
      <Link to={"/"}>
        <img src={logo} className="logo" alt="" />
      </Link>

      <div>
        <ul
          id="navbar"
          className={open ? "active" : ""}
          style={{ margin: "0" }}
        >
          <SearchForm />
          <li>
            <Link className={location.pathname === "/" ? "active" : ""} to="/">
              home
            </Link>
          </li>
          <li>
            <Link
              to="/all-products"
              className={location.pathname === "/all-products" ? "active" : ""}
            >
              shop
            </Link>
          </li>
          <li>
            <div className="dropdown">
              <button className="dropbtn">categories</button>
              <div className="dropdown-content">
                {categories?.map((c) => (
                  <div key={c._id} className="text-start py-2 px-4 ">
                    <Link to={`/category/${c.slug}`}> {c.name}</Link>
                  </div>
                ))}
              </div>
            </div>
          </li>

          {!auth.user ? (
            <>
              <li>
                <Link
                  to="/login"
                  className={location.pathname === "/login" ? "active" : ""}
                >
                  login
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  className={location.pathname === "/register" ? "active" : ""}
                >
                  register
                </Link>
              </li>
            </>
          ) : (
            <div className="dropdown d-modify">
              <button className="dropbtn"> {auth?.user?.name}</button>
              <div className="dropdown-content">
                <li style={{ paddingTop: ".6rem", paddingBottom: ".6rem" }}>
                  <Link
                    to={`/dashboard/${
                      auth?.user?.role === 1 ? "admin" : "user"
                    }`}
                  >
                    Dashboard
                  </Link>
                </li>

                <li style={{ paddingTop: ".6rem", paddingBottom: ".6rem" }}>
                  <Link onClick={handleLogout}>Logout</Link>
                </li>
              </div>
            </div>
          )}
          <Badge className="lg-bag" count={cart?.length}>
            <li id="lg-bag">
              <Link
                to="/cart"
                className={location.pathname === "/cart" ? "active" : ""}
              >
                <i className="fa fa-thin fa-cart-shopping" />
              </Link>
            </li>
          </Badge>
          <p id="close">
            <i className="fa fa-times" onClick={() => setOpen(false)} />
          </p>
        </ul>
      </div>
      <div id="mobile">
        <Badge count={cart?.length}>
          <div id="mobile">
            <Link
              to="/cart"
              className={location.pathname === "/cart" ? "active" : ""}
            >
              <i className="fa fa-thin fa-cart-shopping" />
            </Link>
          </div>
        </Badge>
        <i id="bar" className="fas fa-outdent" onClick={() => setOpen(true)} />
      </div>
    </section>
  );
};

export default Header;
