const uuidv4 = require("uuid").v4
const express = require("express")
const cors = require("cors")
 const generateColumns = (cols) => {
  return Array.from({ length: cols }, (_, x) => `col-${x}`).concat("id");
};
const generateRandomString = () => {
  return (Math.random() + 1).toString(36).substring(2);
};
 const generateRows = (columns, rows) => {
  return Array.from({ length: rows }, (_, x) => {
    const map = new Map();
    map.set("id", uuidv4());
    columns.forEach((col) => {
      map.set(col, generateRandomString());
    });
    return Object.fromEntries(map);
  });
};

const app = express()
app.use(cors())
const port = 4000
const SIZE = 1999
const columnsData = generateColumns(SIZE)
const rowsData = generateRows(columnsData,100)
app.get('/api', (req, res) => {
  res.send({
    columnsData,
    rowsData
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})