// Mock data
let currentUser = null;
let blogPosts = [
  {
    title: "First Post",
    content: "This is the first blog post.",
    author: "JohnDoe",
    date: "2023-07-07",
    comments: [],
  },
  {
    title: "Second Post",
    content: "This is the second blog post.",
    author: "JaneSmith",
    date: "2023-07-08",
    comments: [],
  },
];

// Functions for displaying different sections/pages
function showHomepage() {
  clearContent();

  if (blogPosts.length === 0) {
    document.getElementById("content").textContent = "No blog posts found.";
  } else {
    blogPosts.forEach((post) => {
      const postDiv = document.createElement("div");
      postDiv.innerHTML = `
        <h2>${post.title}</h2>
        <p>${post.content}</p>
        <p>By ${post.author} on ${post.date}</p>
        <button onclick="showPostDetails('${post.title}')">View Details</button>
      `;
      document.getElementById("content").appendChild(postDiv);
    });
  }
}

function showPostDetails(title) {
  clearContent();

  const post = blogPosts.find((post) => post.title === title);
  const postDiv = document.createElement("div");
  postDiv.innerHTML = `
    <h2>${post.title}</h2>
    <p>${post.content}</p>
    <p>By ${post.author} on ${post.date}</p>
    <h3>Comments:</h3>
  `;

  if (post.comments.length === 0) {
    const noCommentsPara = document.createElement("p");
    noCommentsPara.textContent = "No comments yet.";
    postDiv.appendChild(noCommentsPara);
  } else {
    post.comments.forEach((comment) => {
      const commentPara = document.createElement("p");
      commentPara.innerHTML = `
        <strong>${comment.author}</strong> (${comment.date}): ${comment.content}
      `;
      postDiv.appendChild(commentPara);
    });
  }

  if (currentUser) {
    const commentForm = document.createElement("form");
    commentForm.innerHTML = `
      <h3>Add a Comment:</h3>
      <input type="text" id="commentAuthor" placeholder="Your Name" required>
      <textarea id="commentContent" placeholder="Comment" required></textarea>
      <button type="submit">Submit</button>
    `;
    commentForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const author = document.getElementById("commentAuthor").value;
      const content = document.getElementById("commentContent").value;
      addComment(title, author, content);
      showPostDetails(title);
    });
    postDiv.appendChild(commentForm);
  }

  document.getElementById("content").appendChild(postDiv);
}

function showSignUp() {
  clearContent();

  const signUpForm = document.createElement("form");
  signUpForm.innerHTML = `
    <h2>Sign Up</h2>
    <input type="text" id="username" placeholder="Username" required>
    <input type="password" id="password" placeholder="Password" required>
    <button type="submit">Sign Up</button>
  `;
  signUpForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    signUp(username, password);
    showHomepage();
  });

  document.getElementById("content").appendChild(signUpForm);
}

function showSignIn() {
  clearContent();

  const signInForm = document.createElement("form");
  signInForm.innerHTML = `
    <h2>Sign In</h2>
    <input type="text" id="username" placeholder="Username" required>
    <input type="password" id="password" placeholder="Password" required>
    <button type="submit">Sign In</button>
  `;
  signInForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    signIn(username, password);
    showHomepage();
  });

  document.getElementById("content").appendChild(signInForm);
}

function clearContent() {
  document.getElementById("content").innerHTML = "";
}

// Functions for user actions
function signUp(username, password) {
  currentUser = { username, password };
}

function signIn(username, password) {
  if (
    currentUser &&
    currentUser.username === username &&
    currentUser.password === password
  ) {
    console.log("Signed in successfully.");
  } else {
    console.log("Invalid credentials.");
  }
}

function addComment(title, author, content) {
  const post = blogPosts.find((post) => post.title === title);
  const comment = { author, content, date: new Date().toISOString() };
  post.comments.push(comment);
}

// Initial display
showHomepage();
