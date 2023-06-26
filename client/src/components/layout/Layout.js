import React from "react";
import Header from "./Header";
import "../style/Layout.css";
import DownHade from "./DownHade";
import { Helmet } from "react-helmet";
import { Toaster } from "react-hot-toast";

const Layout = (props, description, keywords, author, title) => {
  return (
    <>
      <Helmet>
        <meta charset="UTF-8" />

        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <title>{title}</title>
      </Helmet>
      <Header />

      <main className="Layout">
        {props.children}
        <Toaster />
      </main>

      <DownHade />
    </>
  );
};
Layout.defaultPrpps = {
  title: "ecommerce store-shop now ",
  description: "best online shoping store & every prodect discount avelable",
  keywords: "Mobile,Phone,Cover,Mobile Cover,",
  author: "karmakertelecom.com",
};
export default Layout;
