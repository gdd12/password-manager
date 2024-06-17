import React, { useState, useEffect } from 'react';
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
      <table>
        <tbody>
          {fileInfo.map((entry, index) => (
            <tr key={index}>
              <td>{entry.Username}</td>
              <td>{entry.Password}</td>
              <td>{entry.Website}</td>
              <td>{entry.Text}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Passwords;
