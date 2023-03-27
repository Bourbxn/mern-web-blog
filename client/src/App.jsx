import NavBar from "./components/NavBar";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { getToken, getUser } from "./services/authorize";

function App() {
  const [blogs, setBlogs] = useState([]);
  const fetchData = () => {
    axios
      .get(`${process.env.REACT_APP_API}/blogs`)
      .then((response) => {
        setBlogs(response.data);
      })
      .catch((err) => {
        alert(err);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);

  const confirmDelete = (slug) => {
    Swal.fire({
      title: "Are you sure to delete article?",
      icon: "warning",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        deleteBlog(slug);
      }
    });
  };
  const deleteBlog = (slug) => {
    axios
      .delete(`${process.env.REACT_APP_API}/blog/${slug}`, {
        headers: {
          authorization: `Bearer ${getToken()}`,
        },
      })
      .then((response) => {
        Swal.fire("Deleted!", response.data.message, "success");
        fetchData();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container p-5">
      <NavBar />
      {blogs.map((blog, index) => (
        <div
          className="row"
          key={index}
          style={{ borderBottom: "1px solid silver" }}
        >
          <div className="col pt-3 pb-2">
            <Link to={`/blog/${blog.slug}`}>
              <h2>{blog.title}</h2>
            </Link>
            <div
              dangerouslySetInnerHTML={{
                __html: blog.content.substring(0, 250),
              }}
            />
            <p className="text-muted">
              Author: {blog.author}, Created at{" "}
              {new Date(blog.createdAt).toLocaleString()}
            </p>
            {getUser() && (
              <div>
                <Link
                  className="btn btn-outline-success"
                  to={`/blog/edit/${blog.slug}`}
                >
                  Edit
                </Link>{" "}
                &nbsp;
                <button
                  className="btn btn-outline-danger"
                  onClick={() => confirmDelete(blog.slug)}
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
