import React from "react";

const CategoryForm = ({ handelSubmit, value, setValue, catagory }) => {
  return (
    <div>
      <div className="container mb-3 ">
        <form onSubmit={handelSubmit} className="text-center">
          <div className="mb-3 w-100 text-center center ">
            <label htmlFor="exampleInputEmail1" className="form-label">
              {catagory}
            </label>
            <input
              type="text"
              className="form-control"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          </div>
          <button type="submit" class="btn btn-primary ">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default CategoryForm;
