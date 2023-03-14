import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const SingleBlog = () => {
  const [blog, setBlog] = useState([]);
  const params = useParams();
  const fetchData = () => {
    axios
      .get(`${process.env.REACT_APP_API}/blog/${params.slug}`)
      .then((response) => {
        setBlog(response.data);
      })
      .catch((err) => {
        alert(err);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);
  return <div>{JSON.stringify(blog)}</div>;
};

export default SingleBlog;
