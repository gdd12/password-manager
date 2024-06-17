const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const config = require('config');
const fs = require('node:fs');
const csvFile = require('./csv/csvController')
const { createFile, readFile } = require('./csv/csvServices')

const Router = express();
const {
  app: {
    host: Host,
    port: Port,
    csvFilePath: csvFilePath
  }
} = config

Router.use(cors());
Router.use(bodyParser.json());
Router.use(csvFile)

Router.listen(Port, Host, async () => {
  console.log(`Server is running on http://${Host}:${Port}`);

  if (!fs.existsSync(csvFilePath)) {
    const file = await createFile()
    console.log("File has been created", file)
  }
});