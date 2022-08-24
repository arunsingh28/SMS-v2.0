import axios from 'axios';


axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'content-Type': 'application/json',
  },
  withCredentials: true
})

export default async function apiCall(path: string, cred: any) {
  console.log('CRED_____', cred)
  const apiData = await axios.post('http://localhost:8080' + path, cred)
  return apiData
}

