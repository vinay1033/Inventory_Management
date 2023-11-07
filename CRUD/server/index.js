const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "mysql",
  database: "inventory",
});

app.get("/api/get", (req, res) => {
  const sqlGet = "SELECT * FROM ITEMS";
  db.query(sqlGet, (error, result) => {
    res.send(result);
  });
});

app.post("/api/post", (req, res) => {
  const { productName, Seller, Price } = req.body;
  const sqlInsert = "INSERT INTO ITEMS(productName,Seller,Price) VALUES(?,?,?)";
  db.query(sqlInsert, [productName, Seller, Price], (error, result) => {
    res.send(result);
    if (error) {
      console.log(error);
    }
  });
});

app.delete("/api/remove/:id", (req, res) => {
  const { id } = req.params;
  const sqlRemove = "DELETE FROM ITEMS WHERE ID=?";
  db.query(sqlRemove, id, (error, result) => {
    if (error) {
      console.log(error);
    }
  });
});

app.put("/update", (req, res) => {
  const id = req.body.id;
  const productName = req.body.productName;
  const seller = req.body.Seller;
  const price = req.body.Price;
  db.query(
    "UPDATE Items SET  productName = ? WHERE id = ? ",
    [productName, id],
    (err, result) => {
      console.log("error :", err);
      // console.log("result :" ,result)
    }
  );
  db.query(
    "UPDATE Items SET  Seller = ? WHERE id = ? ",
    [seller, id],
    (err, result) => {
      console.log("error :", err);
      // console.log("result :" ,result)
    }
  );
  db.query(
    "UPDATE Items SET  Price = ? WHERE id = ? ",
    [price, id],
    (err, result) => {
      // console.log("result :" ,result)
    }
  );
});

app.delete("/deleteAll", (req, res) => {
  db.query("TRUNCATE TABLE Items ", (err, result) => {
    console.log("error :", err);
    console.log("result :", result);
  });
});

app.listen(3001, () => {
  console.log("running on port 3001.");
});
