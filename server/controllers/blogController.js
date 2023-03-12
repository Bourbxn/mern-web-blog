//Connect to Database
const slugify = require("slugify");
const Blogs = require("../models/blogs");

//add data
exports.create = (req, res) => {
  const { title, content, author } = req.body;
  const slug = slugify(title);

  //validate data
  switch (true) {
    case !title:
      return res.status(400).json({ error: "please add title" });
    case !content:
      return res.status(400).json({ error: "please add content" });
  }

  //save data
  Blogs.create({ title, content, author, slug }, (err, blog) => {
    if (err) {
      res.status(400).json({ error: "have already title" });
    }
    res.json(blog);
  });
};
