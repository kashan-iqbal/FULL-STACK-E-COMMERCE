import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./style.css";

const Spinner = ({ path = "login" }) => {
  const Navigate = useNavigate();
  const Location = useLocation();

  const [count, setCount] = useState(3);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevValue) => --prevValue);
      count === 0 &&
        Navigate(`/${path}`, {
          state: Location.pathname,
        });
    }, [1000]);

    return () => clearInterval(interval);
  }, [count, Navigate, Location, path]);

  return (
    <div className="custom-container">
      <h3>You Will Be Redirected In {count} Seconds</h3>
      <span className="loader"></span>
    </div>
  );
};

export default Spinner;
