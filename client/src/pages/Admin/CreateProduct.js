import React, { useState, useEffect } from "react";
import Layout from "../../components/layout/Layout";
import AdminMenu from "../../components/layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { Select } from "antd";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/layout/Footer";
const { Option } = Select;
const CreateProduct = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [ram, setRam] = useState("");
  const [camera, setCamera] = useState("");
  const [battery, setBattery] = useState("");
  const [processor, setProcessor] = useState("");
  const [warrnty, setWarrnty] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [display, setDisplay] = useState("");
  const [replace, setReplace] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState("");
  const [category, setCategory] = useState("");
  const [storege, setStorege] = useState("");

  //get category
  const getAllcategory = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/category/get-category`
      );
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("somthing went rongs");
    }
  };
  useEffect(() => {
    getAllcategory();
  }, []);
  //create Product
  const hendelCreate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("Ram", ram);
      productData.append("Camera", camera);
      productData.append("Battery", battery);
      productData.append("Processor", processor);
      productData.append("Warrrnty", warrnty);
      productData.append("Price", price);
      productData.append("description", description);
      productData.append("Display", display);
      productData.append("quantity", quantity);
      productData.append("photo", photo);
      productData.append("Category", category);
      productData.append("shipping", shipping);
      productData.append("Replace", replace);
      productData.append("storege", storege);

      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/product/create-product`,
        productData
      );
      if (data?.success) {
        toast.success(data?.message);
        navigate("/dashbord/admin/product");
      } else {
        toast.error("Product Created Successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error("Somthing went Wrong");
    }
  };

  return (
    <Layout>
      <div className="container ">
        <div className="row ">
          <AdminMenu />
          <div className="col-md-12 mt-5">
            <h4 className="text-center">Create product</h4>
            <hr />
            <div className=" w-100">
              <Select
                bordered={false}
                placeholder="Select a category"
                size="large"
                showSearch
                className="form-select mb-3"
                onChange={(value) => {
                  setCategory(value);
                }}
              >
                {categories?.map((c) => (
                  <Option key={c._id} value={c._id}>
                    {c.name}
                  </Option>
                ))}
              </Select>

              <div className="col-mb-3 mt-2">
                <label className="btn btn-outline-secondary col-12">
                  {photo ? photo.name : "uplod photo"}
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={(e) => setPhoto(e.target.files[0])}
                    hidden
                  />
                </label>
              </div>
              <div className="mb-3 mt-2">
                {photo && (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="Product Photo"
                      height={"150px"}
                      className="img img-responsive"
                    />
                  </div>
                )}
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  value={name}
                  placeholder="Product Name"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  value={ram}
                  placeholder="Product Ram (Optional)"
                  onChange={(e) => setRam(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  value={camera}
                  placeholder="Product Camera (Optional)"
                  onChange={(e) => setCamera(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  value={storege}
                  placeholder="Product Storeg (Optional)"
                  onChange={(e) => setStorege(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  value={battery}
                  placeholder="Product Battery (Optional)"
                  onChange={(e) => setBattery(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  value={processor}
                  placeholder="Product Processor (Optional)"
                  onChange={(e) => setProcessor(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  value={display}
                  placeholder="Product display (optional)"
                  onChange={(e) => setDisplay(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  value={warrnty}
                  placeholder="Product Wrrnty (Optional) "
                  onChange={(e) => setWarrnty(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  value={price}
                  placeholder="Product price"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  value={replace}
                  placeholder="Product Replace (Optional)"
                  onChange={(e) => setReplace(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  value={quantity}
                  placeholder="Product Quantity (Optional)"
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <Select
                  bordered={false}
                  placeholder="Select Shipping"
                  size="large"
                  showSearch
                  className="form-control"
                  onChange={(value) => {
                    setShipping(value);
                  }}
                >
                  <Option value="0">No</Option>
                  <Option value="1">yes</Option>
                </Select>
              </div>
              <div className="mb-3">
                <div className="form-floating">
                  <textarea
                    className="form-control"
                    placeholder="Leave a comment here"
                    id="floatingTextarea"
                    defaultValue={""}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                  <label htmlFor="floatingTextarea">Product Description</label>
                </div>
              </div>
              <div className="mb-3 text-center">
                <button className="btn btn-primary" onClick={hendelCreate}>
                  Create Product
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </Layout>
  );
};

export default CreateProduct;
