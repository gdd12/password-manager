const express = require('express');
const csvFile = express();
const fs = require('fs');

const config = require('config')
const { app: { csvFilePath: csvFilePath }} = config

const { createFile, readFile, editFile } = require('./csvServices')

csvFile.post('/createFile', async (req, res) => {
  if (!fs.existsSync(csvFilePath)) {
    // Once file is created, want to check if it was truly successfull
    const file = await createFile();
    return res.status(200).json({data: file})
  } else {
    return res.status(400).send({error: 'CSV file already exists'});
  }
});

csvFile.get('/readFile', async (req, res) => {
  if (fs.existsSync(csvFilePath)) {
    // Once file is created, want to check if it was truly successfull
    const file = await readFile();
    return res.status(200).json({data: file})
  } else {
    return res.status(404).json({error:'CSV file not found'});
  }
});

csvFile.put('/editFile', async (req, res) => {
  const { id, newData } = req.body;
  if (!id || !newData) {
    return res.status(400).json({error: "Bad request"})
  }
  // Once file is created, want to check if it was truly successfull
  const file = await editFile({id, newData})
  return res.status(200).json({data: file})
});

module.exports = csvFile;
