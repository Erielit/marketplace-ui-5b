import React, { useEffect, useState } from "react";
import axios from "../../../shared/plugins/axios";

export const CategoryList = () => {
  const [categories, setCategories] = useState([]);

  const getCategories = async () => {
    return await axios({ url: "/category/", method: "GET" });
  };

  useEffect(() => {
    getCategories().then(console.log).catch(console.log);
  }, []);

  return <div>CategoryList</div>;
};
