//title, content, author, slug
const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

const blogSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: {},
      required: true,
    },
    author: {
      type: String,
      default: "Admin",
    },
    slug: {
      type: String,
      lowercase: true,
      unique: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Blogs", blogSchema);
