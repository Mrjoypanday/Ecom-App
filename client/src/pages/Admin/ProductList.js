import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import AdminMenu from "../../components/layout/AdminMenu";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { BsCurrencyRupee } from "react-icons/bs";
const ProductList = () => {
  const [products, setProducts] = useState([]);
  //get product
  const getAllProduct = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/get-product`
      );
      setProducts(data.product);
    } catch (error) {
      console.log(error);
      toast.error("Cud not get Product");
    }
  };

  //delete
  const hendelDelete = async (id) => {
    try {
      const { data } = await axios.delete(
        `${process.env.REACT_APP_API}/api/v1/product/delete-product/${id}`
      );
      if (data.success) {
        toast.success("Product Deleted");
        getAllProduct();
      } else {
        toast.error("product not delete");
      }
    } catch (error) {
      console.log(error);
      toast.error("cud not Delete");
    }
  };
  useEffect(() => {
    getAllProduct();
  }, []);
  return (
    <Layout>
      <div className="container ">
        <div className="row">
          <AdminMenu />
          <div className="col-md-12 mt-5">
            <h4 className="text-center">All Product</h4>
            <hr />
            {products?.map((p) => (
              <>
                <div class="card mb-3" key={p._id}>
                  <div className="row g-0">
                    <div className="col-md-4">
                      <img
                        src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                        className="img-fluid rounded-start"
                        alt="product photo"
                      />
                    </div>
                    <div className="col-md-8">
                      <div className="card-body">
                        <div className="row">
                          <div class="col">
                            <p className="card-title d-flex">{p.name}</p>
                          </div>
                          <div className="col">
                            <h5 className="card-title">
                              <BsCurrencyRupee /> {p.Price}
                            </h5>
                          </div>
                        </div>
                        <hr />
                        <div className="row mb-2">
                          {p.Ram ? (
                            <>
                              <li class="card-text">{p.Ram}</li>
                            </>
                          ) : (
                            <></>
                          )}
                          {p.Display ? (
                            <>
                              <li class="card-text">{p.Display}</li>
                            </>
                          ) : (
                            <></>
                          )}
                          {p.Camera ? (
                            <>
                              <li class="card-text">{p.Camera}</li>
                            </>
                          ) : (
                            <></>
                          )}
                          {p.Battery ? (
                            <>
                              <li class="card-text">{p.Battery}</li>
                            </>
                          ) : (
                            <></>
                          )}
                          {p.Processor ? (
                            <>
                              <li class="card-text">{p.Processor}</li>
                            </>
                          ) : (
                            <></>
                          )}

                          {p.Warrrnty ? (
                            <>
                              <li className="card-text">{p.Warrrnty}</li>
                            </>
                          ) : (
                            <></>
                          )}
                          {/* {p.shipping ? (
                              <>
                                <li className="card-text">{p.shipping}</li>
                              </>
                            ) : (
                              <></>
                            )} */}
                          {p.Replace ? (
                            <>
                              <li className="card-text">{p.Replace}</li>
                            </>
                          ) : (
                            <></>
                          )}
                        </div>

                        <p className="card-text w-100">
                          <small className="fst-italic d-block text-center w-100">
                            {p.description}
                          </small>
                          <Link
                            className="btn btn-primary m-2"
                            to={`/dashbord/admin/product/${p.slug}`}
                          >
                            Update
                          </Link>
                          <button
                            className="btn btn-danger m-2"
                            onClick={() => hendelDelete(p._id)}
                          >
                            Delete
                          </button>
                          <small className="text-body-secondary">
                            {p.createdAt}
                          </small>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ))}
          </div>
        </div>
      </div>
      <div className="login-back"></div>
    </Layout>
  );
};

export default ProductList;
