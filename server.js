const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "demo_node_mysql",
});
//connect
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("---My Sql Connected---");
});

const app = express();
// Create Database
// app.get("/createdb", (req, res) => {
//   let sql = "CREATE DATABASE nodemysql";
//   db.query(sql, (err, result) => {
//     if (err) throw err;
//     res.send("Data created..");
//   });
// });
//Creact Table
function accsec() {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);
}
app.get("/createpoststable", (req, res) => {
  let sql =
    "CREATE TABLE posts(id int AUTO_INCREMENT, title VARCHAR(255), des VARCHAR(255), PRIMARY KEY(id))";
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("Posts table created...");
  });
});
app.get("/createpoststable1", (req, res) => {
  let sql =
    "CREATE TABLE comments(id int AUTO_INCREMENT, cmt VARCHAR(255), PRIMARY KEY(id))";
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("Posts table created...");
  });
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
//them item

app.post("/insert", (req, res) => {
  const title = req.body.title;
  const des = req.body.des;
  const sql = "INSERT INTO posts ( title, des) VALUES(? ,?)";
  db.query(sql, [title, des], (err, result) => {
    console.log(result);
  });
});

// hien thi tat ca item
app.get("/getposts", (req, res) => {
  accsec;
  let sql = "SELECT * FROM posts";
  let query = db.query(sql, (err, results) => {
    if (err) throw err;
    console.log(results);
    res.send(results);
  });
});

//hien thi 1 item
app.get("/getpost/:id", (req, res) => {
  let sql = `SELECT * FROM posts WHERE id = ${req.params.id}`;
  let query = db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(result[0]);
  });
});
//Xoa 1 item
app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  console.log("id day: " + id);
  const sql = "DELETE FROM posts WHERE posts.id = ?";
  db.query(sql, id, (err, result) => {
    if (err) console.log(err);
  });
});
//update item
// app.get("/updatepost/:id", (req, res) => {
//   let title = req.body.title;
//   let id = req.params.id;
//   let sql = `UPDATE posts SET title = '${title}' WHERE posts.id = ${id}`;
//   let query = db.query(sql, title, (err, result) => {
//     if (err) throw err;
//     console.log(result);
//     res.send(result);
//   });
// });
app.put("/update/:id", (req, res) => {
  const id = req.params.id;
  const title = req.body.title;
  const des = req.body.des;
  console.log("id day: " + id);
  let sql = `UPDATE posts SET title = '${title}',  des = '${des}' WHERE posts.id = ${id}`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(result);
  });
});
app.delete("/deletecomment/:id", (req, res) => {
  const id = req.params.id;
  console.log("id delete day: " + id);
  const sql = `DELETE FROM comments WHERE comments.id =?`;
  db.query(sql, id, (err, result) => {
    if (err) throw err;
    console.log(result);
  });
});
// them comment
app.post("/addcomment/:id", (req, res) => {
  const id = req.params.id;
  console.log("id add commet: " + id);
  const commentNew = req.body.commentNew;
  console.log("commentNew: " + commentNew);
  const sql = `INSERT INTO comments(cmt, id_post) VALUES (?, ?)`;
  db.query(sql, [commentNew, id], (err, result) => {
    console.log(result);
    res.send(result);
  });
});
// hien thi comment
app.get("/comments/:id", (req, res) => {
  const id = req.params.id;
  console.log(id);
  let sql = `SELECT * FROM comments INNER JOIN posts ON comments.id_post = posts.id WHERE comments.id_post = ${id}`;
  let query = db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(result);
  });
});

app.listen("4000", () => {
  console.log("Sever start on port 4000");
});
