const express = require("express");
const app = express();
const port = 3000
console.log(`Example app listening on port ${port}`)
app.listen(3000)

params = {}
params.app = app;


app.get('/', (req, res) => {
  res.send('Hello World!')
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
