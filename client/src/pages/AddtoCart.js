import React from "react";
import Layout from "../components/layout/Layout";
import { useAuth } from "../context/Auth";
import { useCart } from "../context/Cart";
import { MdDelete } from "react-icons/md";

const AddtoCart = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();

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
  return (
    <Layout>
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
                {/* <h6 className="ms-2">Price : {p.Price}</h6> */}
              </div>
            </div>
            <div className="cart-des">
              <div className="cart-desp">
                <p>{p.description}</p>
                {/* <h6 className="cart-despe">{p.description.substring(0, 30)}</h6> */}
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
    </Layout>
  );
};

export default AddtoCart;
