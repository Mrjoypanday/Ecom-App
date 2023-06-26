import React from "react";
import Layout from "./../../components/layout/Layout";
import AdminMenu from "../../components/layout/AdminMenu";
import { useAuth } from "../../context/Auth";
const AdminDashbord = () => {
  const [auth] = useAuth();
  return (
    <Layout>
      <div className="container-fluid mt-5">
        <div className="row ">
          <div className="col-md-2 mt-3 mb-5">
            <AdminMenu />
          </div>

          <div className="col-md-10">
            <div className="card w-75 p-2">
              <h3> Admin Name :{auth?.users?.name} </h3>
              <h3> Admin email :{auth?.users?.email} </h3>
              <h3> Admin email :{auth?.users?.phone} </h3>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashbord;
