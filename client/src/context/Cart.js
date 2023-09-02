import { createContext, useContext, useState,useEffect } from "react";

const CartContext = createContext();

const CartPovider = ({ children }) => {
  const [cart,setCart] = useState([]);

  useEffect(()=>{

    let existingCatageory = localStorage.getItem("cart")
    if (existingCatageory) setCart(JSON.parse(existingCatageory))
  },[])
  return (
    <CartContext.Provider value={[cart, setCart]}>
      {children}
    </CartContext.Provider>
  );
};

//custom hook
const useCart = () => useContext(CartContext);

export { CartPovider,useCart };
