import React, { useState, useEffect } from "react";
import Layout from "../../components/layout/Layout";
import AdminMenu from "./../../components/layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { Modal } from "antd";
import CategoryForm from "../../components/Form/CategoryForm";

const CreateCatagory = () => {
  const [category, setCategory] = useState([]);
  const [name, setName] = useState("");
  const [visibal, setVisibal] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");
  const handelSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/category/create-category`,
        { name }
      );
      if (data?.success) {
        toast.success(`${name} is created `);
        getAllcategory();
        setName("");
      } else {
        toast.error(data);
      }
    } catch (error) {
      console.log(error);
      toast.error("somthing went rongs");
    }
  };
  //get category
  const getAllcategory = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/category/get-category`
      );
      if (data?.success) {
        setCategory(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("somthing went rongs");
    }
  };
  useEffect(() => {
    getAllcategory();
  }, []);
  //update category
  const handelUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/category/update-category/${selected._id}`,
        { name: updatedName }
      );
      if (data.success) {
        toast.success(`Update category`);
        setSelected(null);
        setUpdatedName("");
        setVisibal(false);
        getAllcategory();
      } else {
        toast.error("Category not updated");
      }
    } catch (error) {
      toast.error("Somthing went rong");
    }
  };
  const hendelete = async (pId) => {
    try {
      const { data } = await axios.delete(
        `${process.env.REACT_APP_API}/api/v1/category/delete-category/${pId}`
      );
      if (data.success) {
        toast.success(` Category is deleted`);

        getAllcategory();
      } else {
        toast.error("Category not updated");
      }
    } catch (error) {
      toast.error("Somthing went rong");
    }
  };
  return (
    <Layout>
      <div className="container">
        <div className="row">
          <AdminMenu />

          <div className="col-md-12 mt-5">
            <h4 className="text-center">All Catagory</h4>
            <hr />
            <div className="">
              <CategoryForm
                handelSubmit={handelSubmit}
                value={name}
                setValue={setName}
                catagory={"Create Category"}
              />
            </div>
            <div className="w-100 ">
              <table className="table table-bordered">
                <thead>
                  <tr className="text-center">
                    <th scope="col ">Category</th>
                    <th scope="col ">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {category?.map((c) => (
                    <>
                      <tr className="text-center">
                        <td key={c._id}>{c.name}</td>
                        <td className="text-center">
                          <button
                            className="btn btn-primary "
                            onClick={() => {
                              setVisibal(true);
                              setUpdatedName(c.name);
                              setSelected(c);
                            }}
                          >
                            edit
                          </button>
                          <button
                            className="btn btn-danger mx-2"
                            onClick={() => {
                              hendelete(c._id);
                            }}
                          >
                            delet
                          </button>
                        </td>
                      </tr>
                    </>
                  ))}
                </tbody>
              </table>
            </div>
            <Modal
              onCancel={() => setVisibal(false)}
              footer={null}
              open={visibal}
            >
              <CategoryForm
                value={updatedName}
                setValue={setUpdatedName}
                handelSubmit={handelUpdate}
                catagory={"Update Category"}
              />
            </Modal>
          </div>
        </div>
      </div>
      <div className="login-back"></div>
    </Layout>
  );
};

export default CreateCatagory;
