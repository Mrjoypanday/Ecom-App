import React from "react";
import Layout from "../components/layout/Layout";
import { Link } from "react-router-dom";
import useCategory from "../hooks/useCategory";
const Category = () => {
  const categories = useCategory();
  return (
    <Layout>
      <h1 className="text-center mt-3">all categorise</h1>
      <div className="container">
        <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-6 text-center">
            {categories?.map((c) => (
              <Link
                className="btn btn-primary  mb-2 ms-2"
                to={`/category/${c.slug}`}
              >
                {c.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Category;
