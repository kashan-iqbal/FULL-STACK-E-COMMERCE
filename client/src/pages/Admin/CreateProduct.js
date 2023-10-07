import { Select } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Adminmenu from "../../Component/Adminmenu";
import Layout from "../../Component/Layout";
const { Option } = Select;

const CreateProduct = () => {
  const Naviagte = useNavigate();

  const [category, setCategory] = useState("");
  const [input, setInput] = useState({
    name: "",
    price: "",
    description: "",
    categories: [],
    quantity: "",
    shipping: "",
    photo: null,
  });

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/category");
      if (data?.success) {
        setInput({ ...input, categories: data?.allCategories });
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllCategory();
    //eslint-disable-next-line
  }, []);

  const inputChangeHandler = (e) => {
    console.log(input);
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("category", category);
      productData.append("name", input.name);
      productData.append("price", input.price);
      productData.append("quantity", input.quantity);
      productData.append("description", input.description);
      productData.append("photo", input.photo);
      const res = await axios.post(
        "/api/v1/products/create-product",
        productData
      );
      if (res.data.success) {
        setTimeout(() => {
          toast.success("Product Created Successfully");
        }, 20);
        Naviagte("/dashboard/admin/products");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went Wrong");
    }
  };

  return (
    <Layout title={"Create Product"}>
      <div style={{ minHeight: "85vh" }}>
        <div className="container-fluid ">
          <div className="row">
            <div className="col-md-3  p-3 m-3">
              <Adminmenu />
            </div>
            <div className="col-md-8  p-3 m-3">
              <h1>Create product</h1>

              <div className="m-1 w-75">
                <Select
                  style={{ color: "black" }}
                  bordered={false}
                  placeholder="Select a Category"
                  size="large"
                  showSearch
                  className="form-select mb-3"
                  onChange={(value) => {
                    setCategory(value);
                  }}
                >
                  {input.categories.map((c) => (
                    <Option
                      key={c._id}
                      value={c._id}
                      style={{ color: "black" }}
                    >
                      {c.name}
                    </Option>
                  ))}
                </Select>
                <div className="mb-3">
                  <label className="btn btn-outline-secondary col-md-12">
                    {input.photo ? input.photo.name : "Upload Photo"}
                    <input
                      type="file"
                      name="photo"
                      accept="image/*"
                      onChange={(e) =>
                        setInput({ ...input, photo: e.target.files[0] })
                      }
                      hidden
                    />
                  </label>
                </div>
                <div className="mb-3">
                  {input.photo && (
                    <div className="text-center ">
                      <img
                        src={URL.createObjectURL(input.photo)}
                        alt="Product"
                        style={{ maxWidth: "100%", height: "200px" }}
                        className="img img-responsive"
                      />
                    </div>
                  )}
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    name="name"
                    className="form-control mb-3"
                    value={input.name}
                    placeholder="Product Name"
                    onChange={inputChangeHandler}
                  />

                  <input
                    type="number"
                    name="price"
                    className="form-control mb-3"
                    value={input.price}
                    placeholder="Product Price"
                    onChange={inputChangeHandler}
                  />
                  <input
                    type="number"
                    name="quantity"
                    className="form-control mb-3"
                    value={input.quantity}
                    placeholder="Product Qunatitiy Available"
                    onChange={inputChangeHandler}
                  />
                  <textarea
                    name="description"
                    className="form-control mb-3"
                    rows="4"
                    cols="50"
                    value={input.description}
                    placeholder="Product Description"
                    onChange={inputChangeHandler}
                  />
                  <Select
                    bordered={false}
                    placeholder="Select Shipping"
                    size="large"
                    showSearch
                    name="shipping"
                    className="form-control mb-3"
                    onChange={(value) =>
                      setInput({ ...input, shipping: value })
                    }
                  >
                    <Option value={0}>No</Option>
                    <Option value={1}>Yes</Option>
                  </Select>
                  <div className="mb-3">
                    <button className="btn btn-primary" onClick={handleCreate}>
                      Create Product
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateProduct;
