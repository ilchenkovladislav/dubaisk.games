import { API_CONFIG } from '../config.js'

class ApiClient {
  constructor(config) {
    this.client = axios.create({
      baseURL: config.BASE_URL,
      timeout: config.TIMEOUT,
      headers: {
        'Content-Type': 'application/json',
      },
    })

    this.setupInterceptors()
  }

  setupInterceptors() {
    this.client.interceptors.request.use(
      (config) => {
        return config
      },
      (error) => Promise.reject(error),
    )

    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        this.handleApiError(error)
        return Promise.reject(error)
      },
    )
  }

  handleApiError(error) {
    if (error.response) {
      console.error(`API Error ${error.response.status}:`, error.response.data)
    } else if (error.request) {
      console.error('Network Error:', error.message)
    } else {
      console.error('Request Error:', error.message)
    }
  }

  async get(endpoint) {
    const response = await this.client.get(endpoint)

    return response.data
  }

  async post(endpoint, data) {
    const response = await this.client.post(endpoint, data)
    return response.data
  }

  async put(endpoint, data) {
    const response = await this.client.put(endpoint, data)
    return response.data
  }

  async delete(endpoint) {
    const response = await this.client.delete(endpoint)
    return response.data
  }
}

export const apiClient = new ApiClient(API_CONFIG)
