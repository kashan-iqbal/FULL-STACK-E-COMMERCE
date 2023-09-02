import { Modal } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { toast } from "react-hot-toast";
import Adminmenu from "../../Component/Adminmenu";
import Layout from "../../Component/Layout";
import Catageoryform from "../../Component/form/Catageoryform";

const Catageroy = () => {
  const [categeroy, setCategeroy] = useState([]);
  const [name, setName] = useState("");
  const [visible, setvisible] = useState(false);
  const [slected, setSlected] = useState(null);
  const [updateName, setUpdatedName] = useState("");

  // form handlers
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/v1/category/create-category", {
        name,
      });
      if (data?.success) {
        toast.success(`${name} is created successfully`);
        getAllCatagers();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("some thing went wrong in input form ");
    }
  };

  // get all catagers items from backend
  const getAllCatagers = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/category");
      if (data.success) {
        setCategeroy(data.allCategories);
        setName("");
      }
    } catch (error) {
      console.log(error);
      toast.error("some thing went wrong in get-category");
    }
  };

  useEffect(() => {
    getAllCatagers();
  }, []);

  // update catgeory

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `/api/v1/category/update-category/${slected._id}`,
        { name: updateName }
      );
      if (data.success) {
        setTimeout(() => {
          toast.success(`${updateName} is updated `);
        }, 20);
        setSlected(null);
        setUpdatedName("");
        setvisible(false);
        getAllCatagers();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("some thing went wrong 1");
      console.log(error);
    }
  };

  // Delete catgeory

  const handleDelete = async (pid) => {
    try {
      const { data } = await axios.delete(
        `/api/v1/category/delete-category/${pid}`
      );
      if (data.success) {
        setTimeout(() => {
          toast.success(`catageory is delete`);
        }, 20);
        getAllCatagers();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("some thing went wrong 1");
      console.log(error);
    }
  };
  return (
    <Layout title={"Create Catageroy"}>
      <div style={{ minHeight: "85vh" }}>
        <div className="container-fluid ">
          <div className="row">
            <div className="col-md-3 p-3">
              <Adminmenu />
            </div>
            <div className="col-md-6  p-3">
              <h1 className="mt-2"> Manage Categories</h1>
              <div className="p-3 w-40">
                <Catageoryform
                  handleSubmit={handleSubmit}
                  value={name}
                  setValue={setName}
                />
              </div>
              <Table className="table">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {categeroy?.map((c) => (
                    <tr className="fs-5" key={c._id}>
                      <td>{c.name}</td>
                      <td>
                        <button
                          className="btn btn-primary ms-2"
                          onClick={() => {
                            setvisible(true);
                            setName(c.name);
                            setSlected(c);
                          }}
                        >
                          Edit
                        </button>{" "}
                        <button
                          className="btn btn-danger  ms-2"
                          onClick={() => {
                            handleDelete(c._id);
                          }}
                        >
                          Delete
                        </button>{" "}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>

            <Modal
              onCancel={() => setvisible(false)}
              footer={null}
              open={visible}
            >
              <Catageoryform
                value={updateName}
                setValue={setUpdatedName}
                handleSubmit={handleUpdate}
              />
            </Modal>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Catageroy;
