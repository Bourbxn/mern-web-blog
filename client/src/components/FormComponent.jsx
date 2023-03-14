import axios from "axios";
import React, { useState } from "react";
import Swal from "sweetalert2";
import NavBar from "./NavBar";

const FormComponent = () => {
  const [state, setState] = useState({
    title: "",
    content: "",
    author: "",
  });
  const { title, content, author } = state;
  const inputValue = (name) => (event) => {
    setState({ ...state, [name]: event.target.value });
  };
  const submitForm = (e) => {
    e.preventDefault();
    console.log("API URL = ", process.env.REACT_APP_API);
    axios
      .post(`${process.env.REACT_APP_API}/create`, { title, content, author })
      .then(() => {
        Swal.fire("Good job!", "Successfully to add an article!", "success");
        setState({ ...state, title: "", content: "", author: "" });
      })
      .catch((err) => {
        Swal.fire("Oops...", err.response.data.error, "error");
      });
  };
  return (
    <div className="container p-5">
      <NavBar />
      <h1>Write an Article</h1>
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
        <input type="submit" value="save" className="btn btn-primary" />
      </form>
    </div>
  );
};

export default FormComponent;
