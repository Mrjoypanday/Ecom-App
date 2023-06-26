import React, { useState, useEffect } from "react";
import Layout from "./../../components/layout/Layout";
import axios from "axios";
import { useAuth } from "../../context/Auth";
import moment from "moment";
import Footer from "../../components/layout/Footer";
const UserOder = () => {
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();
  const getOrders = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/auth/orders`
      );
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);
  return (
    <Layout>
      <div className="container">
        <h1 className="text-center">All Orders </h1>
        {orders?.map((o, i) => {
          return (
            <div className="dorder shadow" key={o?._id}>
              <table className="table mb-0">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Status</th>
                    <th scope="col">Buyer</th>
                    <th scope="col">Orders</th>
                    <th scope="col">Payment</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{i + 1}</td>
                    <td>{o?.status}</td>
                    <td>{o?.buyer?.name}</td>
                    <td>{moment(o?.createAt).fromNow()}</td>
                    <td>{o?.payment.success ? "Success" : "Faild"}</td>
                  </tr>
                </tbody>
              </table>
              <div className="container">
                {o?.products.map((p, i) => (
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
                        <h6 className="cart-despe">
                          {p.description.substring(0, 30)}
                        </h6>
                      </div>
                      <div className="cart-butt"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
      <Footer />
    </Layout>
  );
};

export default UserOder;
