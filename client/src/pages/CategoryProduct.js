import React, { useState, useEffect } from "react";
import Layout from "../components/layout/Layout";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { AiOutlineStar } from "react-icons/ai";
import { GiShoppingCart } from "react-icons/gi";
import { BsCurrencyRupee } from "react-icons/bs";
import { useCart } from "../context/Cart";
import toast from "react-hot-toast";
import Footer from "../components/layout/Footer";
import { useAuth } from "../context/Auth";
import { useNavigate } from "react-router-dom";
const CategoryProduct = () => {
  const params = useParams();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [cart, setCart] = useCart();
  const [auth] = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (params?.slug) getProductBycateGory();
  }, [params?.slug]);
  const getProductBycateGory = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/product-category/${params.slug}`
      );
      setProducts(data?.products);
      setCategory(data?.Category);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
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
                    toast.success("Itme add to cart");
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

export default CategoryProduct;
