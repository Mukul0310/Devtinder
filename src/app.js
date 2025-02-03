const express = require("express");
const app = express();

app.use("/hello", (req, res) => {
  res.send("Hello from Hello");
});
app.use("/test", (req, res) => {
  res.send("Hello from test");
});
app.use((req, res) => {
  res.send("Hello from Server");
});
app.listen(7777, () => {
  console.log("Server listening from port 7777");
});
