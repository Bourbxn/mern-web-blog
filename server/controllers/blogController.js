//Connect to Database
const slugify = require("slugify");
const Blogs = require("../models/blogs");
const { v4: uuidv4 } = require("uuid");

//add data
exports.create = (req, res) => {
  const { title, content, author } = req.body;
  let slug = slugify(title);

  if (!slug) slug = uuidv4();
  //validate data
  switch (true) {
    case !title:
      return res.status(400).json({ error: "Please add title name!" });
    case !content:
      return res.status(400).json({ error: "Please add content details!" });
  }

  //save data
  Blogs.create({ title, content, author, slug }, (err, blog) => {
    if (err) {
      res.status(400).json({ error: "Have already title name!" });
    }
    res.json(blog);
  });
};

//get data
exports.getAllBlogs = (req, res) => {
  Blogs.find({}).exec((err, blogs) => {
    console.log("get all");
    res.json(blogs);
  });
};

//get single data
exports.singleBlog = (req, res) => {
  const { slug } = req.params;
  Blogs.findOne({ slug }).exec((err, blog) => {
    res.json(blog);
  });
};

// delete data
exports.remove = (req, res) => {
  const { slug } = req.params;
  Blogs.findOneAndRemove({ slug }).exec((err, blog) => {
    if (err) console.log(err);
    res.json({
      message: "Successfully Deleted!",
    });
  });
};

// update data
exports.update = (req, res) => {
  const { slug } = req.params;
  const { title, content, author } = req.body;
  Blogs.findOneAndUpdate(
    { slug },
    { title, content, author },
    { new: true }
  ).exec((err, blog) => {
    if (err) console.log(err);
    res.json(blog);
  });
};
