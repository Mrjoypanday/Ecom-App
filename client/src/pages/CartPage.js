import React, { useState, useEffect } from "react";
import Layout from "../components/layout/Layout";
import { useAuth } from "../context/Auth";
import { useCart } from "../context/Cart";
import { useNavigate } from "react-router-dom";
import "../components/style/CartPage.css";
import Footer from "../components/layout/Footer";
import { BsCurrencyRupee } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";
import { toast } from "react-hot-toast";
const CartPage = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  //delet cart item
  const removeCartitem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };
  //total price
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => {
        total = total + item.Price;
      });
      return total;
    } catch (error) {
      console.log(error);
    }
  };
  //get payment gatewaya token
  const getToken = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/braintree/token`
      );
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getToken();
  }, [auth?.token]);
  //payment hendel
  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/product/braintree/payment`,
        {
          nonce,
          cart,
        }
      );
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashbord/user/oders");
      toast.success("payment Successfully");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <Layout>
      <div className="container mt-4">
        <div className="row mt-3">
          <div className="col-sm-12 mt-4 ">
            <h4 className="text-center">{`Hello ${
              auth?.token && auth.users?.name
            }`}</h4>
            <h6 className="text-center">
              {cart?.length
                ? `You have ${cart.length} items in your cart ${
                    auth?.token ? "" : "Please Login to checkout"
                  }`
                : "Your Cart is Empty"}
            </h6>
            {cart?.map((p) => (
              <div className="cart ">
                <div className="cart-body">
                  <div className="img-cart">
                    <img
                      className="cart-img"
                      src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                    />
                  </div>
                  <div className="cart-name">
                    <h6 className="ms-2">Name : {p.name}</h6>
                    <h6 className="ms-2">Price : {p.Price}</h6>
                  </div>
                </div>
                <div className="cart-des">
                  <div className="cart-desp">
                    <h6 className="cart-despe">{p.description}</h6>
                  </div>
                  <div className="cart-butt">
                    <button
                      className="cartbutton"
                      onClick={() => removeCartitem(p._id)}
                    >
                      <MdDelete />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="col-sm-6 col-lg-10 d-flex justify-content-center mb-4">
            <div className="payment p-3">
              <h6 className="mt-2">Card Summery</h6>
              <p className="mt-2">TOTAL | Chackout | Payment </p>
              <hr />
              <h4>
                Total :<BsCurrencyRupee />
                {totalPrice()}
              </h4>
              {auth?.users?.address ? (
                <>
                  <div className="mb-3">
                    <h4>Current Address</h4>
                    <h5>{auth?.users?.address}</h5>
                    <button
                      className="btn btn-outline-warning"
                      onClick={() => navigate("/dashbord/user/profile")}
                    >
                      Update Address
                    </button>
                  </div>
                </>
              ) : (
                <div className="mb-3">
                  {auth?.token ? (
                    <button
                      className="btn btn-outline-warning"
                      onClick={() => navigate("/dashbord/user/profile")}
                    >
                      Update Address
                    </button>
                  ) : (
                    <button
                      className="btn btn-outline-warning"
                      onClick={() =>
                        navigate("/login", {
                          state: "/cart",
                        })
                      }
                    >
                      Plase Login to checkout
                    </button>
                  )}
                </div>
              )}
              <div className="mt-2">
                {!clientToken || !auth?.token || !cart?.length ? (
                  ""
                ) : (
                  <>
                    <DropIn
                      options={{
                        authorization: clientToken,
                        paypal: {
                          flow: "vault",
                        },
                      }}
                      onInstance={(instance) => setInstance(instance)}
                    />

                    <button
                      className="btn btn-primary"
                      onClick={handlePayment}
                      disabled={loading || !instance || !auth?.user?.address}
                    >
                      {loading ? "Processing ...." : "Make Payment"}
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </Layout>
  );
};

export default CartPage;
