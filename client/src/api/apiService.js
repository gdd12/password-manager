import axios from 'axios'

const grabFileInformation = async () => {
  try {
    const fileInfo = await axios.get('http://localhost:3001/readFile')
    return fileInfo
  } catch (error) {
    return error
  }
}

const editFileInformation = async (requestData) => {
  // requestData should include (id, newData)
  try {
    const fileInfo = await axios.put('http://localhost:3001/editFile', requestData)
    return fileInfo
  } catch (error) {
    return error
  }
}

export { grabFileInformation, editFileInformation };