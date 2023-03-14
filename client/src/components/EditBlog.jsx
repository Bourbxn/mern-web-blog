import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import NavBar from "./NavBar";

const EditBlog = () => {
  const [state, setState] = useState({
    title: "",
    content: "",
    author: "",
    slug: "",
  });
  const { title, content, author, slug } = state;
  const params = useParams();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API}/blog/${params.slug}`)
      .then((response) => {
        const { title, content, author, slug } = response.data;
        setState({ ...state, title, content, author, slug });
      })
      .catch((err) => alert(err));
    // eslint-disable-next-line
  }, []);

  const showUpdateForm = () => (
    <form onSubmit={submitForm}>
      <div className="form-group">
        <label>Title</label>
        <input
          type="text"
          className="form-control"
          value={title}
          onChange={inputValue("title")}
        />
      </div>
      <div className="form-group">
        <label>Content</label>
        <textarea
          className="form-control"
          value={content}
          onChange={inputValue("content")}
        ></textarea>
      </div>
      <div className="form-group">
        <label>Author</label>
        <input
          type="text"
          className="form-control"
          value={author}
          onChange={inputValue("author")}
        />
      </div>
      <br />
      <input type="submit" value="update" className="btn btn-primary" />
    </form>
  );

  const inputValue = (name) => (event) => {
    setState({ ...state, [name]: event.target.value });
  };

  const submitForm = (e) => {
    e.preventDefault();
    axios
      .put(`${process.env.REACT_APP_API}/blog/${slug}`, {
        title,
        content,
        author,
      })
      .then((response) => {
        Swal.fire("Good job!", "Successfully to edit an article!", "success");
        const { title, content, author, slug } = response.data;
        setState({ ...state, title, author, content, slug });
      })
      .catch((err) => {
        Swal.fire("Oops...", err.response.data.error, "error");
      });
  };

  return (
    <div className="container p-5">
      <NavBar />
      <h1>Edit Article</h1>
      {showUpdateForm()}
    </div>
  );
};

export default EditBlog;
