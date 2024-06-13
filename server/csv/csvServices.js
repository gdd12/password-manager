const csv = require('csv-parser');
const fs = require('fs');
const { createObjectCsvWriter } = require('csv-writer');

const config = require('config');
const { app: { csvFilePath: csvFilePath }} = config

const createFile = async () => {
  try {
    const csvWriter = createObjectCsvWriter({
      path: csvFilePath,
      header: [
        { id: 'username', title: 'Username' },
        { id: 'password', title: 'Password' },
        { id: 'website', title: 'Website' },
        { id: 'text', title: 'Text' }
      ]
    });
    csvWriter.writeRecords([])
    return csvWriter
  } catch (error) {
    return error
  }
}

const readFile = async () => {
  try {
    const rows = [];
    fs.createReadStream(csvFilePath)
      .pipe(csv())
      .on('data', (row) => {
        rows.push(row);
      })
      .on('end', () => {
        return rows;
      });
    return rows;
  } catch (error) {
    return error
  }
}

const editFile = async (file) => {
  const { id, newData } = file;
  try {
    const rows = [];
    fs.createReadStream(csvFilePath)
      .pipe(csv())
      .on('data', (row) => {
        if (row.id === id) {
          Object.assign(row, newData);
        }
        rows.push(row);
      })
      .on('end', () => {
        const csvWriter = createObjectCsvWriter({
          path: csvFilePath,
          header: [
            { id: 'username', title: 'Username' },
            { id: 'password', title: 'Password' },
            { id: 'website', title: 'Website' },
            { id: 'text', title: 'Text' }
          ]
        });
        csvWriter.writeRecords(rows)
          .then(() => {
            return csvWriter
          })
          .catch((err) => {
            return err
          });
      });
  } catch (error) {
    return error
  }
}

module.exports = { createFile, readFile, editFile };