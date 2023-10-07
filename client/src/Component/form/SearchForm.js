import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useSearch } from "../../context/search";
import "./search.css";
const SearchForm = () => {
  const [values, setValues] = useSearch();
  const Navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        `/api/v1/products/search/${values.keyword}`
      );
      setValues({ ...values, results: data });
      Navigate("/search");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form className="d-flex" onSubmit={handleSubmit}>
        <div className="seaech-wrap">
          <div className="search mx-auto">
            <input
              type="text"
              className="searchTerm w-50 "
              placeholder="What are you looking for?"
              value={values.keywords}
              onChange={(e) =>
                setValues({ ...values, keyword: e.target.value })
              }
            />
            <button type="submit" className="searchButton">
              <i
                className="fa fa-search"
                style={{ verticalAlign: "middle", fontSize: "1rem" }}
              />
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default SearchForm;
