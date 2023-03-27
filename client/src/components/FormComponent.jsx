import axios from "axios";
import React, { useState } from "react";
import Swal from "sweetalert2";
import NavBar from "./NavBar";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { getToken, getUser } from "../services/authorize";

const FormComponent = () => {
  const [state, setState] = useState({
    title: "",
    author: getUser(),
  });

  const { title, author } = state;

  const [content, setContent] = useState("");

  const inputValue = (name) => (event) => {
    setState({ ...state, [name]: event.target.value });
  };

  const submitContent = (event) => {
    setContent(event);
  };

  const submitForm = (e) => {
    e.preventDefault();
    axios
      .post(
        `${process.env.REACT_APP_API}/create`,
        { title, content, author },
        {
          headers: {
            authorization: `Bearer ${getToken()}`,
          },
        }
      )
      .then(() => {
        Swal.fire("Good job!", "Successfully to add an article!", "success");
        setState({ ...state, title: "", author: "" });
        setContent("");
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
          <ReactQuill
            value={content}
            onChange={submitContent}
            theme="snow"
            className="pb-5 mb-3"
            placeholder="write details of your article"
            style={{ border: "1px solid #666" }}
          />
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
