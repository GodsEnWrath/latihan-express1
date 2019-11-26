// Use Express

const express = require("express");
const app = express();
const PORT = 5000;
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("GET");
  console.log("GET");
});
// app.get("/:id", (req, res) => console.log("GET ONE"));
// app.post("/", (req, res) => console.log("POST"));
// app.put("/", (req, res) => console.log("UPDATE"));
// app.put("/:id", (req, res) => console.log("UPDATE ONE"));
// app.delete("/", (req, res) => console.log("DELETE"));
// app.delete("/:id", (req, res) => console.log("DELETE ONE"));
// app.patch("/", (req, res) => console.log("PATCH"));
// app.patch("/:id", (req, res) => console.log("PATCH ONE"));

app.post("/", (req, res) => {
  console.log("POST")
  console.log(req.body)
  res.send({
    message: "New Item Is Added",
    data: {
      name: req.body.name,
      address: req.body.address,
      age: req.body.age
    }
  });
});

app.get("/hello", (req, res) => {
  res.send("Hello im learning Express");
});

app.get("/ketiga", (req, res) => {
  const datas = [1, 2, 3, 5];
  res.status(404).send({ message: "Your End " });
  // res.json({data: datas}) //res, req bisa diganti res.json
  res.redirect(301, "/");
});

app.get("/kedua", (req, res) => {
  const datas = [1, 2, 3, 5];
  // res.req({data: datas})
  res.json({ data: datas }); //res, req bisa diganti res.json
});

app.get("/pertama", (req, res) => {
  const datas = [1, 2, 3, 5];
  res.status(404).send({ message: "Your End " });
});

app.get("/download", (req, res) => {
  res.download("./file/lock.png");
});

app.listen(PORT, () => {
  console.log(`This app listening on PORT: ${PORT}`);
});
