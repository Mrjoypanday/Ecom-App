import React, { useState, useEffect } from "react";
import Layout from "../components/layout/Layout";
import axios from "axios";
import Slider from "../components/layout/Slider";
import "../components/style/Home.css";
import Footer from "../components/layout/Footer";
import { BsCurrencyRupee } from "react-icons/bs";
import { Link } from "react-router-dom";
import { AiOutlineStar } from "react-icons/ai";
import { GiShoppingCart } from "react-icons/gi";
import { useCart } from "../context/Cart";
import toast from "react-hot-toast";
import { useAuth } from "../context/Auth";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useCart();
  const [auth] = useAuth();
  const navigate = useNavigate();

  //

  //get product
  const getAllProduct = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/get-product`
      );
      setProducts(data.product);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllProduct();
  }, []);
  return (
    <Layout title={"Best offers"}>
      <Slider />

      <div className="product-body mt-3">
        <div className="Gallery">
          {products?.map((p) => (
            <>
              <div data-aos="fade-right" className="content">
                <button
                  className="Addto-cart position-absolute top-0 end-0"
                  onClick={() => {
                    setCart([...cart, p]);
                    localStorage.setItem("cart", JSON.stringify([...cart, p]));
                    toast.success("Item Added to cart");
                  }}
                >
                  <GiShoppingCart />
                </button>
                <Link className="product-view" to={`/product/${p.slug}`}>
                  <img
                    className="Img-product"
                    src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                  />

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
                        setCart([...cart, p]);
                        localStorage.setItem(
                          "cart",
                          JSON.stringify([...cart, p])
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
                          onClick={() => navigate("/dashbord/user/profile")}
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

export default Home;
