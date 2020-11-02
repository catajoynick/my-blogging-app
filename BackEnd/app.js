const express = require("express");
const app = express();
const Post = require("./api/model/posts");
var multer = require("multer");
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}${getExt(file.mimetype)}`);
  },
});

const getExt = (mimeType) => {
  switch (mimeType) {
    case "image/png":
      return ".png";

    case "image/jpg":
      return ".jpg";

    case "image/jpeg":
      return ".jpg";
  }
};
var upload = multer({ storage: storage });

const postsData = new Post();

app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

app.get("/api/posts", (req, res) => {
  res.status(200).send(postsData.getPost());
});

app.get("/api/posts/:post_id", (req, res) => {
  const postId = req.params.post_id;
  const foundPost = postsData.getSelectedPost(postId);
  if (foundPost) {
    res.status(200).send(foundPost);
  } else {
    res.status(404).send("ERROR 404: PAGE NOT FOUND");
  }
  res.status(200).send();
});
app.post("/api/posts/", upload.single("post-image"), (req, res) => {
  const newPost = {
    id: `${Date.now()}`,
    title: req.body.title,
    content: req.body.content,
    post_image: req.file.path,
    added_date: `${Date.now()}`,
  };
  postsData.addNewPost(newPost);

  res.status(201).send("OK");
});
app.listen(3000, () => {
  console.log("listening on http://localhost:3000");
});
