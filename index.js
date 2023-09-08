const express = require("express");
const app = express();
const port = 8083
params = {}
params.app = app;


app.get('/', (req, res) => {
  res.send('Hello World!')
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
