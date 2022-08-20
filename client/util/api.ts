import axios from 'axios';

axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'content-Type': 'application/json'
  }
})

export default async function apiCall(path: string, cred: any) {
  const apiData = await axios.post(path,cred)
  return apiData
}

