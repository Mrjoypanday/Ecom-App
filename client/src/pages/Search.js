import React, { useState, useEffect } from "react";
import Layout from "../components/layout/Layout";
import { useSearch } from "../context/Search";
import { AiOutlineStar } from "react-icons/ai";
import { GiShoppingCart } from "react-icons/gi";
import { BsCurrencyRupee } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/Cart";
import axios from "axios";
import toast from "react-hot-toast";
import Footer from "../components/layout/Footer";
import { useAuth } from "../context/Auth";
const Search = () => {
  const [values, setvalues] = useSearch();
  const [product, setProduct] = useState([]);
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
      setProduct(data.product);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllProduct();
  }, []);
  return (
    <Layout>
      <div className="container">
        <div className="text-center">
          <h1>Search Results</h1>
          <h6>
            {values?.results.length < 1
              ? "No Product Found"
              : `Found : ${values?.results.length}`}
          </h6>
          <div className="product-body-2 mt-3">
            <div className="Gallery">
              {values?.results.map((p) => (
                <>
                  <div data-aos="fade-right" className="content">
                    <button
                      className="Addto-cart position-absolute top-0 end-0"
                      onClick={() => {
                        setCart([...cart, p]);
                        localStorage.setItem(
                          "cart",
                          JSON.stringify([...cart, p])
                        );
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
                            <button className="ByNow">BY NOW</button>
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
        </div>
      </div>
      <Footer />
    </Layout>
  );
};

export default Search;
