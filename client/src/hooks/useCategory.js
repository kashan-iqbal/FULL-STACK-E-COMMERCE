import axios from "axios";
import { useEffect, useState } from "react";

export default function useCategory() {
  const [categories, setCategories] = useState([]);
  //get categ
  const getCategoriesHandler = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/category");
      setCategories(data?.allCategories);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getCategoriesHandler();
  }, []);
  return categories;
}
