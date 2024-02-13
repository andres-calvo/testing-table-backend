const uuidv4 = require("uuid").v4
const express = require("express")
const cors = require("cors")

const baseStringColumn = (id, name) => ({
  "id": id,
  "name": name,
  "label": name.toUpperCase(),
  "is_system_column": true,
  "is_chained_column": false,
  "is_generated": false,
  "query": null,
  "position": 1,
  "is_new_version": true,
  "is_group_aggregation_column": false,
  "is_hidden_by_user": false,
  "is_hidden_for_everyone": false,
  "is_rec_manual_hidden_by_user": false,
  "origin_column": null,
  "is_union_column": false,
  "v_lookup_is_orphan": false,
  "due_column": null,
  "reasons_not_editable": null,
  "format_parameters": {
    "length": 60
  },
  "is_cast_locked": false,
  "is_inheritable_column": true,
  "is_column_cast": false,
  "display_format_parameters": {},
  "is_hidden": false,
  "is_processing": false,
  "is_draft": false,
  "active": true,
  "uniqueness": null,
  "resource": 13339,
  "v_lookup_column": null,
  "parent": null,
  "hidden_by": [],
  "data_format": {
    "id": 3,
    "name": "string",
    "data_type": "string",
    "parameters": {
      "length": "integer"
    },
    "support_multiple": false
  },
  "transformations": [],
  "mapped_by_external_app": false
})
const generateColumns = (cols) => {
  return Array.from({ length: cols }, (_, x) => baseStringColumn(x,`col-${x}`)).concat(baseStringColumn("00000","id"));
};
const generateRandomString = () => {
  return (Math.random() + 1).toString(36).substring(2);
};
const generateRows = (columns, rows) => {
  return Array.from({ length: rows }, (_, x) => {
    const map = new Map();
    map.set("id", uuidv4());
    columns.forEach((col) => {
      map.set(col.name, generateRandomString());
    });
    return Object.fromEntries(map);
  });
};

const app = express()
app.use(cors())
const port = 4000
const SIZE = 1999
const columnsData = generateColumns(SIZE)
const rowsData = generateRows(columnsData, 100)
app.get('/api', (req, res) => {
  res.send({
    columnsData,
    rowsData
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})