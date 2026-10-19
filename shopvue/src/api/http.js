import axios from 'axios'

// One axios instance with the base URL of the mock service
const http = axios.create({
  baseURL: 'https://dummyjson.com',
  timeout: 10000
})

// Turns any axios error into a readable message for the user
export function errorText(e) {
  if (e.response) {
    const msg = (e.response.data && e.response.data.message) || e.response.statusText
    return `Server error ${e.response.status}: ${msg}`
  }
  if (e.request) {
    return 'Cannot reach the server. Check your internet connection.'
  }
  return e.message
}

export default http