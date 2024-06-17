import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { grabFileInformation } from '../api/apiService';

const Passwords = () => {
  const [fileInfo, setFileInfo] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await grabFileInformation();
        console.log('Response:', response.data.data);
        setFileInfo(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching file information:', error);
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching data: {error.message}</div>;
  }

  return (
    <div className='container'>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table" border="2">
          <TableHead>
            <TableRow>
              <TableCell>Company</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Password</TableCell>
              <TableCell>Text</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {fileInfo.map((entry, index) => (
              <TableRow key={index}>
                <TableCell>
                  <a
                    href={'http://' + entry.Website}
                    rel="noreferrer"
                    target='_blank'>{entry.Company}
                  </a>
                </TableCell>
                <TableCell>{entry.Username}</TableCell>
                <TableCell>{entry.Password}</TableCell>
                <TableCell>{entry.Text}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <button style={{float:"right"}} onClick={() => {console.log('Add')}}>Add</button>
    </div>
  );
};

export default Passwords;
