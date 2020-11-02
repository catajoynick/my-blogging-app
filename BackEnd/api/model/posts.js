const PATH = "./data.json";
const fs = require("fs");
class Post {
  constructor() {}
  getPost() {
    return this.readData();
  }

  getSelectedPost(postId) {
    const posts = this.readData();
    const foundPost = posts.find((post) => post.id == postId);

    return foundPost;
  }

  addNewPost(newPost) {
    // Add new posts
    const currentData = this.readData();
    currentData.unshift(newPost);
    this.storeData(currentData);
  }

  readData() {
    let rawdata = fs.readFileSync(PATH);
    let posts = JSON.parse(rawdata);

    return posts;
  }

  storeData(rawdata) {
    let data = JSON.stringify(rawdata);
    fs.writeFileSync(PATH, data);
  }
}

module.exports = Post;
