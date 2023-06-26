import React, { useState, useEffect } from "react";
import Layout from "../../components/layout/Layout";
import AdminMenu from "../../components/layout/AdminMenu";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../../context/Auth";

import { Select } from "antd";
import Footer from "../../components/layout/Footer";
const { Option } = Select;
const Users = () => {
  const [status, setStatus] = useState([
    "Not Process",
    "Processing",
    "Shiping",
    "Deliverd",
    "Canel",
  ]);
  const [changeStatus, setChangeStatus] = useState("");
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();

  const getOrders = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/auth/all-orders`
      );
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);
  //hendel Status
  const handelStatus = async (orderId, value) => {
    const { data } = await axios.put(
      `${process.env.REACT_APP_API}/api/v1/auth/status-orders/${orderId}`,
      {
        status: value,
      }
    );
    getOrders();
    try {
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout>
      <div className="container">
        <AdminMenu />

        <h4 className="text-center">all Orders</h4>
        <hr />

        {orders?.map((o, i) => {
          return (
            <div className="dorder shadow">
              <table className="table mb-0">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Status</th>
                    <th scope="col">Buyer</th>

                    <th scope="col">Payment</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{i + 1}</td>
                    <td>
                      <Select
                        bordered={false}
                        onChange={(value) => handelStatus(o._id, value)}
                        defaultValue={o?.status}
                      >
                        {status.map((s, i) => (
                          <Option key={i} value={s}>
                            {s}
                          </Option>
                        ))}
                      </Select>
                    </td>
                    <td>{o?.buyer?.phone}</td>

                    <td>{o?.payment.success ? "Success" : "Faild"}</td>
                  </tr>
                </tbody>
              </table>

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
          );
        })}
      </div>

      <Footer />
    </Layout>
  );
};

export default Users;
