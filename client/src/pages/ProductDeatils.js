import React, { useState, useEffect } from "react";
import Layout from "./../components/layout/Layout";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../components/style/SingelProduct.css";
import { BsCurrencyRupee } from "react-icons/bs";
import { TbPointFilled } from "react-icons/tb";
import { Link } from "react-router-dom";
import { AiOutlineStar } from "react-icons/ai";
import { GiShoppingCart } from "react-icons/gi";
import "../components/style/Home.css";
import { useCart } from "../context/Cart";
import toast from "react-hot-toast";
import Footer from "../components/layout/Footer";
import { useAuth } from "../context/Auth";
import { useNavigate } from "react-router-dom";
const ProductDeatils = () => {
  const params = useParams();
  const [product, setProduct] = useState({});
  const [reletedproduct, setReletedproduct] = useState([]);
  const [cart, setCart] = useCart();
  const [auth] = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params.slug]);
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
      simelerProduct(data?.product._id, data?.product.Category._id);
    } catch (error) {
      console.log(error);
    }
  };
  //releted product
  const simelerProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/releted-product/${pid}/${cid}`
      );
      setReletedproduct(data?.product);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="container bg-white mt-5">
        <div className="row mt-3">
          <div className="col-sm-6 text-center mb-3 mt-2 ">
            <div className=" p-2">
              <img
                className="img_product border"
                src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${product._id}`}
                alt="product"
              />
            </div>
            <button
              type="button"
              className="btn btn-warning mt-3 w-100 h-45 rounded-pill"
              onClick={() => {
                setCart([cart, product]);
                localStorage.setItem(
                  "cart",
                  JSON.stringify([...cart, product])
                );
                toast.success("Itme add to cart");
              }}
            >
              ADD TO CART
            </button>
            {auth?.users?.address ? (
              <>
                <button
                  className="btn btn-primary mt-2 w-100 h-45 rounded-pill"
                  onClick={() => {
                    setCart([...cart, product]);
                    localStorage.setItem(
                      "cart",
                      JSON.stringify([...cart, product])
                    );
                    navigate("/dashbord/user/profile");
                  }}
                >
                  BY NOW
                </button>
              </>
            ) : (
              <>
                {auth?.token ? (
                  <>
                    <button className="btn btn-primary mt-2 w-100 h-45 rounded-pill">
                      BY NOW
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="btn btn-primary mt-2 w-100 h-45 rounded-pill"
                      onClick={() => {
                        setCart([...cart, product]);
                        localStorage.setItem(
                          "cart",
                          JSON.stringify([...cart, product])
                        );

                        navigate("/login", { state: "/cart" });
                      }}
                    >
                      BY NOW
                    </button>
                  </>
                )}
              </>
            )}
          </div>
          <div className="col-sm-6 border  ">
            <h5 className=" mb-3">{product.name}</h5>
            <h3 className="ms-2 text-success mb-3">
              <BsCurrencyRupee />
              {product.Price}
              <small className="border border-primary p-1 mb-2 border-opacity-25 ms-3 text-info-emphasis small-delevery">
                Delevery free
              </small>
            </h3>
            {product.Ram ? (
              <>
                <p className="mb-3">
                  <TbPointFilled /> RAM/ROM : {product.Ram}
                </p>
              </>
            ) : (
              <></>
            )}

            {product.Display ? (
              <>
                <p className="mb-3">
                  <TbPointFilled /> Display :{product.Display}
                </p>
              </>
            ) : (
              <></>
            )}

            {product.Camera ? (
              <>
                <p className="mb-3">
                  <TbPointFilled /> Camera :{product.Camera}
                </p>
              </>
            ) : (
              <></>
            )}

            {product.storege ? (
              <>
                <p className="mb-3">
                  <TbPointFilled /> Storage : {product.storege}
                </p>
              </>
            ) : (
              <></>
            )}

            {product.Battery ? (
              <>
                <p className="mb-3">
                  <TbPointFilled /> Battery : {product.Battery}
                </p>
              </>
            ) : (
              <></>
            )}

            {product.Processor ? (
              <>
                <p className="mb-3">
                  <TbPointFilled />
                  Processor :{product.Processor}
                </p>
              </>
            ) : (
              <></>
            )}

            {product.Warrrnty ? (
              <>
                <p className="mb-3">
                  <TbPointFilled /> Warranty : {product.Warrrnty}
                </p>
              </>
            ) : (
              <></>
            )}

            {product.Replace ? (
              <>
                <p className="mb-3">
                  <TbPointFilled /> Replacement/Repair : {product.Replace}
                </p>
              </>
            ) : (
              <></>
            )}

            <p className="mb-3">
              <TbPointFilled />
              Few left : {product.quantity}
            </p>
            <p className="fw-semibold">
              <TbPointFilled />
              Product Description :
              <small className="fst-italic fw-normal">
                {product.description}
              </small>
            </p>
          </div>
        </div>
      </div>
      <div className="product-body mt-3">
        <div className="Gallery">
          {reletedproduct?.map((p) => (
            <>
              <div data-aos="fade-right" className="content">
                <button
                  className="Addto-cart position-absolute top-0 end-0"
                  onClick={() => {
                    setCart([...cart, p]);
                    localStorage.setItem("cart", JSON.stringify([...cart, p]));
                    toast.success("Itme add to cart");
                  }}
                >
                  <GiShoppingCart />
                </button>

                <img
                  className="Img-product"
                  src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                />

                <Link className="product-view" to={`/product/${p.slug}`}>
                  <h3 className="product-name">{p.name}</h3>
                  <p className="product-descrip">{p.description}</p>
                  <h6 className="product-price">
                    <BsCurrencyRupee />
                    {p.Price}
                  </h6>
                </Link>
                <ul className="revew">
                  <li className="retting">
                    <AiOutlineStar />
                  </li>
                  <li className="retting">
                    <AiOutlineStar />
                  </li>
                  <li className="retting">
                    <AiOutlineStar />
                  </li>
                  <li className="retting">
                    <AiOutlineStar />
                  </li>
                  <li className="retting">
                    <AiOutlineStar />
                  </li>
                </ul>
                {auth?.users?.address ? (
                  <>
                    <button
                      className="ByNow"
                      onClick={() => {
                        setCart([...cart, product]);
                        localStorage.setItem(
                          "cart",
                          JSON.stringify([...cart, product])
                        );
                        navigate("/dashbord/user/profile");
                      }}
                    >
                      BY NOW
                    </button>
                  </>
                ) : (
                  <>
                    {auth?.token ? (
                      <>
                        <button
                          className="ByNow"
                          onClick={() => {
                            setCart([...cart, product]);
                            localStorage.setItem(
                              "cart",
                              JSON.stringify([...cart, product])
                            );
                            navigate("/dashbord/user/profile");
                          }}
                        >
                          BY NOW
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className="ByNow"
                          onClick={() => {
                            setCart([...cart, p]);
                            localStorage.setItem(
                              "cart",
                              JSON.stringify([...cart, p])
                            );

                            navigate("/login", { state: "/cart" });
                          }}
                        >
                          BY NOW
                        </button>
                      </>
                    )}
                  </>
                )}
              </div>
            </>
          ))}
        </div>
      </div>
      <Footer />
    </Layout>
  );
};

export default ProductDeatils;
