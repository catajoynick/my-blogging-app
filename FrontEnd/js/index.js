// This populates the homepage with posts.

const API_URL = "http://localhost:3000/api/posts";
const API_BASE_URL = "http://localhost:3000/";

window.onload = () => {
  getPosts();
};

const getPosts = () => {
  fetch(API_URL, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .then((responseData) => {
      buildPosts(responseData);
    });
};

const buildPosts = (blogPosts) => {
  console.log(blogPosts);
  let blogPostContent = "";
  for (blogpost of blogPosts) {
    const postDate = new Date(parseInt(blogpost.added_date)).toDateString();
    const postImage = `${API_BASE_URL}${blogpost.post_image}`;
    const link = `/my-blogging-app/FrontEnd/post.html?id=${blogpost.id}`;
    blogPostContent += `
       <article class="blog-post">
        <img src=${postImage} alt="" class="post-image">
         <div class="post-details">
              <h2 class="blog-post-title">${blogpost.title}</h2>
              <p class="blog-post-content">${blogpost.content}</p>
         </div>
        <p class="blog-post-date">${postDate}</p>
         <a href="${link}" class="post-read-more">Read more</a>
      </article>`;
  }

  document.querySelector(".blog-section").innerHTML = blogPostContent;
};
