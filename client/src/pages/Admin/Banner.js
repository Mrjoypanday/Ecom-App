import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import Layout from "../../components/layout/Layout";
import AdminMenu from "../../components/layout/AdminMenu";
const Banner = () => {
  const [photo, setPhoto] = useState("");
  const [name, setName] = useState("");
  const [products, setProducts] = useState([]);

  const hendelCreate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();

      productData.append("photo", photo);
      productData.append("name", name);

      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/banner/create-banner`,
        productData
      );
      if (data?.success) {
        toast.success(data?.message);
        setName("");
        setPhoto("");
      } else {
        toast.error("banner not Created ");
      }
    } catch (error) {
      console.log(error);
      toast.error("Somthing went Wrong");
    }
  };
  //get banner
  const getAllProduct = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/banner/get-banner`
      );
      setProducts(data.bannear);
    } catch (error) {
      console.log(error);
      toast.error("Cud not get banner");
    }
  };
  //delete banner
  const deletBannetr = async (id) => {
    try {
      const { data } = await axios.delete(
        `${process.env.REACT_APP_API}/api/v1/banner/delete-banner/${id}`
      );
      if (data.success) {
        toast.success(data.message);
        getAllProduct();
      }
    } catch (error) {}
  };

  useEffect(() => {
    getAllProduct();
  }, []);

  return (
    <Layout>
      <div className="container">
        <div className="row">
          <AdminMenu />
          <div className="col-md-12 mt-5">
            <h4 className="text-center">Uplod Banner</h4>
            <hr />
            <div className="col-mb-3 mt-2">
              <label className="btn btn-outline-secondary col-md-12">
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
                    alt="Photo"
                    height={"200px"}
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
                placeholder="banner Name"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-3 text-center">
              <button className="btn btn-primary" onClick={hendelCreate}>
                Create banner
              </button>
            </div>
            {products?.map((p) => (
              <>
                <div
                  className="card mb-3"
                  key={p._id}
                  style={{ maxWidth: 540 }}
                >
                  <div className="row g-0">
                    <div className="col-md-12">
                      <img
                        src={`${process.env.REACT_APP_API}/api/v1/banner/get-bannerphoto/${p._id}`}
                        className="img-fluid rounded-start"
                        alt="..."
                      />
                    </div>
                  </div>
                  <div className="mb-2 text-center mt-3 ">
                    <button
                      className="btn btn-danger w-50"
                      onClick={() => deletBannetr(p._id)}
                    >
                      delete
                    </button>
                  </div>
                </div>
              </>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Banner;
