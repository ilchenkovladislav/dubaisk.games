import axios from "axios"

export const apiClient = axios.create({
    // baseURL: "http://localhost:3000/api/",
    baseURL: "https://ilchenkow.ru/api/",
    headers: {
        'Content-Type': 'application/json'
    },
})

apiClient.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => Promise.reject(error),
)

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    handleApiError(error)
    return Promise.reject(error)
  },
)

function handleApiError(error) {
  if (error.response) {
    console.error(`API Error ${error.response.status}:`, error.response.data)
  } else if (error.request) {
    console.error('Network Error:', error.message)
  } else {
    console.error('Request Error:', error.message)
  }
}
