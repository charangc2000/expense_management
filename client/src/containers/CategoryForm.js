import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { asyncSetCategory } from "../actions/categoryAction.js";
import { Button } from "antd";

import "./../styles/FormInput.css";

const CategoryForm = (props) => {
  const dispatch = useDispatch();

  const [category, setCategory] = useState("");

  const handleChange = (e) => {
    const result = e.target.value;
    setCategory(result);
  };

  const handleClick = (e) => {
    e.preventDefault();
    const data = {
      name: category,
    };
    dispatch(asyncSetCategory(data));
    setCategory("");
  };

  return (
    <div className="formThree">
      <h2 style={{ fontWeight: "bold", marginBottom: "0.2rem" }}>
        Categories:
      </h2>
      <div>
        <input
          type="text"
          placeholder="category name here..."
          value={category}
          onChange={handleChange}
        />
      </div>
      <br />
      <Button
        style={{
          backgroundColor: "darkblue",
          color: "white",
          fontSize: 10,
          fontWeight: "bold",
        }}
        type="submit"
        value="Add"
        onClick={handleClick}
      >
        Add
      </Button>
    </div>
  );
};

export default CategoryForm;
