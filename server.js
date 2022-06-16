const express = require("express");
const path = require("path");
const bodyP = require("body-parser");
const texts = require(__dirname + "/texts.js");

const app = express();

app.set("view engine", "ejs");

app.use(bodyP.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

const posts = [];

app.get(["/", "/home"], function (req, res) {
  res.render("home", { text: texts.HomeText, posts: posts });
});

app.get("/contact", function (req, res) {
  res.render("contact", { text: texts.ContactText });
});

app.get("/about", function (req, res) {
  res.render("about", { text: texts.AboutText });
});

app.get("/compose", function (req, res) {
  res.render("compose");
});

app.post("/compose", function (req, res) {
  const { text, title } = req.body;
  posts.push({ text, title });
  res.redirect("/");
});

app.get("/post/:title", function (req, res) {
  const rqTitle = req.params.title.replace(/\s+/g, "-").toLowerCase();
  let post = posts.find(
    (post) => post.title.replace(/\s+/g, "-").toLowerCase() === rqTitle
  );
  if (!post)
    post = { title: `${req.params.title} not exist.`, text: "Post not found." };
  res.render("post", { post: post });
});

app.listen(5000, function (err, res) {
  if (err) {
    console.log(err);
  } else {
    console.log("Server is running at: http://localhost:5000/");
  }
});
