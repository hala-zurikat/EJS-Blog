import express from "express";
import bodyParser from "body-parser";
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

const port = 3000;
const posts = [
  {
    id: 1,
    content: "The only way to do great work is to love what you do.",
    name: "Steve Jobs",
    title: "Co-founder of Apple",
  },
  {
    id: 2,
    content:
      "Success is not final, failure is not fatal: It is the courage to continue that counts.",
    name: "Winston Churchill",
    title: "Former Prime Minister of the UK",
  },
  {
    id: 3,
    content: "In the middle of every difficulty lies opportunity.",
    name: "Albert Einstein",
    title: "Theoretical Physicist",
  },
  {
    id: 4,
    content: "Believe you can and you're halfway there.",
    name: "Theodore Roosevelt",
    title: "26th President of the USA",
  },
  {
    id: 5,
    content: "The best way to predict the future is to invent it.",
    name: "Alan Kay",
    title: "Computer Scientist",
  },
  {
    id: 6,
    content: "Don’t watch the clock; do what it does. Keep going.",
    name: "Sam Levenson",
    title: "Author and Humorist",
  },
  {
    id: 7,
    content:
      "The future belongs to those who believe in the beauty of their dreams.",
    name: "Eleanor Roosevelt",
    title: "Former First Lady of the USA",
  },
  {
    id: 8,
    content: "I have not failed. I've just found 10,000 ways that won't work.",
    name: "Thomas Edison",
    title: "Inventor and Businessman",
  },
  {
    id: 9,
    content: "It always seems impossible until it’s done.",
    name: "Nelson Mandela",
    title: "Former President of South Africa",
  },
  {
    id: 10,
    content: "Whether you think you can or you think you can't, you're right.",
    name: "Henry Ford",
    title: "Founder of Ford Motor Company",
  },
];
let postId = 11;
app.get("/", (req, res) => {
  res.render("home.ejs", { posts: posts });
});
app.get("/home", (req, res) => {
  res.render("home.ejs", { posts: posts });
});
app.get("/new", (req, res) => {
  res.render("new.ejs");
});
app.get("/about", (req, res) => {
  res.render("about.ejs");
});
app.get("/searchResult", (req, res) => {
  const searchItem = req.query.query;

  if (!searchItem) {
    return res.render("searchResult", { results: [], searchItem: "" });
  }

  const lowerCase = searchItem.toLowerCase();

  const filteredPosts = posts.filter(
    (post) =>
      post.content.toLowerCase().includes(lowerCase) ||
      post.title.toLowerCase().includes(lowerCase) ||
      post.name.toLowerCase().includes(lowerCase)
  );

  console.log({ filteredPosts, searchItem });

  res.render("searchResult", { results: filteredPosts, searchItem });
});

app.get("/edit/:id", (req, res) => {
  const theId = parseInt(req.params.id);
  const postIndex = posts.find((post) => post.id === theId);
  res.render("update.ejs", { postIndex: postIndex });
});
app.post("/edit", (req, res) => {
  res.redirect("/");
});
app.post("/submit", (req, res) => {
  const newPost = {
    id: postId++,
    content: req.body.content,
    name: req.body.name,
    title: req.body.title,
  };
  posts.push(newPost);
  res.status(200).redirect("/");
});
app.post("/edit/:id", (req, res) => {
  const theId = parseInt(req.params.id);
  const editedPost = posts.find((post) => post.id === theId);
  const newPost = {
    id: theId,
    content: req.body.content || editedPost.content,
    name: req.body.name || editedPost.name,
    title: req.body.title || editedPost.title,
  };
  const postIndex = posts.findIndex((post) => post.id === theId);
  posts[postIndex] = newPost;
  res.status(200).redirect("/");
});
app.post("/delete/:id", (req, res) => {
  const theId = parseInt(req.params.id);
  const postIndex = posts.findIndex((post) => post.id === theId);
  if (postIndex > -1) {
    posts.splice(postIndex, 1);
    res.redirect("/");
  } else res.send("<p>Post is not found</p>");
});
app.listen(port, () => {
  console.log("the server is running");
});
