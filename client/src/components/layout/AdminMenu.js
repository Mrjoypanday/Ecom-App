import React from "react";
import { NavLink } from "react-router-dom";
const AdminMenu = () => {
  return (
    <div class="dropdown position-fixed justify-content-center z-3 ">
      <button
        class="btn btn-secondary dropdown-toggle"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        Admin Menu
      </button>
      <ul class="dropdown-menu bg-primary p-1 ">
        <li>
          <NavLink
            to={"/dashbord/admin/create-category"}
            className="nav-link active text-white m-1"
            aria-current="true"
          >
            Create catagory
          </NavLink>
        </li>
        <li>
          <NavLink
            to={"/dashbord/admin/create-product"}
            className="list-group-item list-group-item-action text-white m-1"
          >
            Create Product
          </NavLink>
        </li>
        <li>
          <NavLink
            to={"/dashbord/admin/product"}
            className="list-group-item list-group-item-action text-white m-1"
          >
            All Product
          </NavLink>
        </li>
        <li>
          <NavLink
            to={"/dashbord/admin/orders"}
            className="list-group-item list-group-item-action text-white m-1"
          >
            All Orders
          </NavLink>
        </li>
        <li>
          <NavLink
            to={"/dashbord/admin/banner"}
            className="list-group-item list-group-item-action text-white m-1"
          >
            Uplod banners
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default AdminMenu;
