import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Polichy from "./pages/Polichy";
import PagenotFound from "./pages/PagenotFound";
import { useEffect } from "react";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import PrivetRoute from "./components/Routes/Private";
import Dashbord from "./pages/users/Dashbord";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import AdminRoute from "./components/Routes/AdminRought";
import AdminDashbord from "./pages/Admin/AdminDashbord";
import CreateCatagory from "./pages/Admin/CreateCatagory";
import CreateProduct from "./pages/Admin/CreateProduct";
import Users from "./pages/Admin/Users";
import UserProfile from "./pages/users/UserProfile";
import UserOder from "./pages/users/UserOder";
import Banner from "./pages/Admin/Banner";
import ProductList from "./pages/Admin/ProductList";
import UpdateProduct from "./pages/Admin/UpdateProduct";
import Search from "./pages/Search";
import ProductDeatils from "./pages/ProductDeatils";
import Category from "./pages/Category";
import CategoryProduct from "./pages/CategoryProduct";
// import AddtoCart from "./pages/AddtoCart";
import CartPage from "./pages/CartPage";

function App() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/category" element={<Category />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/category/:slug" element={<CategoryProduct />} />
        <Route path="/product/:slug" element={<ProductDeatils />} />
        <Route path="dashbord" element={<PrivetRoute />}>
          <Route path="user" element={<Dashbord />} />
          <Route path="user/profile" element={<UserProfile />} />
          <Route path="user/oders" element={<UserOder />} />
        </Route>
        <Route path="dashbord" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashbord />} />
          <Route path="admin/create-category" element={<CreateCatagory />} />
          <Route path="admin/create-product" element={<CreateProduct />} />
          <Route path="admin/orders" element={<Users />} />
          <Route path="admin/product" element={<ProductList />} />
          <Route path="admin/product/:slug" element={<UpdateProduct />} />
          <Route path="admin/banner" element={<Banner />} />
        </Route>
        <Route path="/about" element={<About />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/policy" element={<Polichy />} />
        <Route path="*" element={<PagenotFound />} />
      </Routes>
    </>
  );
}

export default App;
