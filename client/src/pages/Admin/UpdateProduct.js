import { Select } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import Adminmenu from "../../Component/Adminmenu";
import Layout from "../../Component/Layout";
import useCategory from "../../hooks/useCategory";
const { Option } = Select;

const UpdateProduct = () => {
  const Naviagte = useNavigate();
  const params = useParams();
  const categories = useCategory();

  const [input, setInput] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    id: "",
    quantity: "",
    shipping: "",
    photo: null,
  });

  // for fetching single product
  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/products/get-product/${params.slug}`
      );
      const product = data?.singleProduct;
      setInput({
        ...input,
        name: product.name,
        id: product._id,
        price: product.price,
        quantity: product.quantity,
        description: product.description,
        shipping: product.shipping,
        category: product.category,
      });
    } catch (error) {
      console.log(error);
    }
  };
  // ---------- for fetching old image--------------------

  const fetchImage = async () => {
    try {
      if (input.id) {
        const response = await axios.get(
          `/api/v1/products/product-photo/${input?.id}`,
          {
            responseType: "blob", // Receive the image as a Blob
          }
        );

        // Convert the Blob to a data URL using FileReader
        const reader = new FileReader();
        reader.onload = () => {
          setInput({ ...input, photo: reader.result });
        };
        reader.readAsDataURL(response.data);
      }
    } catch (error) {
      console.error("Error fetching image:", error);
    }
  };

  // get product initial one time
  useEffect(() => {
    fetchImage();
    getSingleProduct();
    // getPhotoHandler();
    //eslint-disable-next-line
  }, []);

  // input change
  const inputChangeHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  // update product
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("category", input?.category?._id);
      productData.append("name", input.name);
      productData.append("price", input.price);
      productData.append("quantity", input.quantity);
      productData.append("description", input.description);
      if (input.photo) {
        productData.append("photo", input.photo);
      }
      const res = await axios.put(
        `/api/v1/products/update-product/${input.id}`,
        productData
      );
      console.log(res.data.sucess);
      if (true) {
        setTimeout(() => {
          toast.success("Product Updated Successfully");
        }, 20);
        Naviagte("/dashboard/admin/products");
      } else {
        toast.error("masla");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went Wrong");
    }
  };

  //delete product
  const handleDelete = async () => {
    try {
      const res = await axios.delete(`/api/v1/products/product/${input.id}`);
      if (res.data.success) {
        setTimeout(() => {
          toast.success("Product deleted Successfully");
        }, 20);
        Naviagte("/dashboard/admin/products");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  return (
    <Layout title={"Update Product"}>
      <div style={{ minheight: "85vh" }}>
        <div className="container-fluid ">
          <div className="row">
            <div className="col-md-3  p-3 m-3">
              <Adminmenu />
            </div>
            <div className="col-md-8  p-3 m-3">
              <h1>Update product</h1>

              <div className="m-1 w-75">
                <Select
                  style={{ color: "black" }}
                  bordered={false}
                  placeholder="Select a Category"
                  size="large"
                  showSearch
                  className="form-select mb-3"
                  onChange={(value) => {
                    const cop = categories.filter((c) => c.name === value);
                    setInput({ ...input, category: cop[0] });
                  }}
                  value={
                    input?.category
                      ? input?.category?.name
                      : "Loading ........."
                  }
                >
                  {categories.map((c) => (
                    <Option
                      key={c?._id}
                      value={c.name}
                      style={{ color: "black" }}
                    >
                      {c.name}
                    </Option>
                  ))}
                </Select>
                <div className="mb-3">
                  <label className="btn btn-outline-secondary col-md-12">
                    {input.photo ? input.photo.name : "Upload New Photo"}
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
                  {input.photo ? (
                    <div className="text-center ">
                      <img
                        src={URL.createObjectURL(input.photo)}
                        alt="Product"
                        style={{ maxWidth: "100%", height: "200px" }}
                        className="img img-responsive"
                      />
                    </div>
                  ) : (
                    <div className="text-center">
                      <img
                        src={`/api/v1/products/product-photo/${input.id} `}
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
                    value={input.shipping ? "Yes" : " No"}
                  >
                    <Option value={0}>No</Option>
                    <Option value={1}>Yes</Option>
                  </Select>
                  <div className="mb-3">
                    <button
                      className="btn btn-primary"
                      onClick={handleCreate}
                      style={{ marginRight: "1rem", marginTop: "1rem" }}
                    >
                      Update Product
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={handleDelete}
                      style={{ marginTop: "1rem" }}
                    >
                      Delete Product
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

export default UpdateProduct;
