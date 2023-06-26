import React, { useState } from "react";
import { useSearch } from "../../context/Search";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import "./Search.css";
const SearchInput = () => {
  const [values, setValues] = useSearch();
  const navigate = useNavigate();

  const hendelSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/search/${values.keyword}`
      );
      setValues({ ...values, results: data });
      navigate("/search");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <form className="d-flex logo-2" role="search" onSubmit={hendelSubmit}>
        <input
          className="search-inp"
          type="search"
          placeholder="Search..."
          aria-label="Search"
          value={values.keyword}
          onChange={(e) => setValues({ ...values, keyword: e.target.value })}
        />
        <button className="buttonSearch">search</button>
      </form>
    </>
  );
};

export default SearchInput;
