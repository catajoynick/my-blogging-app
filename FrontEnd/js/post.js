const API_URL = "http://localhost:3000/api/posts";
const API_BASE_URL = "http://localhost:3000/";

window.onload = () => {
  getPost();
};

const getPostParam = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get("id");
};

const getPost = () => {
  const postId = getPostParam();
  const specificPost = `${API_URL}/${postId}`;
  console.log(specificPost);
  fetch(specificPost, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .then((responseData) => {
      buildPost(responseData);
    });
};

const buildPost = (specificBlogPost) => {
  let postDate = new Date(parseInt(specificBlogPost.added_date)).toDateString();
  const postImage = `${API_BASE_URL}${specificBlogPost.post_image}`;
  console.log(postImage);

  let headerImage = `<img src=${postImage} alt="">`;

  let post = ` 
   <section class="blog-post">
        <div class="blog-post-title">
            <h1>${specificBlogPost.title}</h1>
        </div>
        <div class="blog-post-date">
           ${postDate}
        </div>
        <div class="blog-post-content">
            ${specificBlogPost.content}
        </div>

    </section>`;

  document.querySelector(".blog-section").innerHTML = post;
  document.querySelector(
    ".header-section"
  ).style.backgroundImage = `url(${postImage})`;
};
