import React from "react";
import Layout from "../components/layout/Layout";
import { Link } from "react-router-dom";

const PagenotFound = () => {
  return (
    <Layout title={"goback -page not found"}>
      <div className="container text-center  center ">
        <div class="position-absolute top-50 start-50 translate-middle border  border-danger p-4">
          <h1 className="fs-1" style={{ fontfamily: "Playfair, seri f" }}>
            404
          </h1>

          <h1 className="fs-1">Page not Found </h1>
          <Link class="btn btn-primary" to={"/"} role="button">
            Go Back
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default PagenotFound;
