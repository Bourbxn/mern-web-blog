import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavBar from "./NavBar";

const SingleBlog = () => {
  const [blog, setBlog] = useState("");
  const params = new useParams();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API}/blog/${params.slug}`)
      .then((response) => {
        setBlog(response.data);
      })
      .catch((err) => alert(err));
    // eslint-disable-next-line
  }, []);

  return (
    <div className="container p-5">
      <NavBar />
      {blog && (
        <div>
          <h1>{blog.title}</h1>
          <div
            dangerouslySetInnerHTML={{
              __html: blog.content,
            }}
          />
          <p className="text-muted">
            Author: {blog.author}, Created at{" "}
            {new Date(blog.createdAt).toLocaleString()}
          </p>
        </div>
      )}
    </div>
  );
};

export default SingleBlog;
