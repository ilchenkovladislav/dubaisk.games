const isDevelopment = chrome.runtime.id === 'kecleiebmlclnibnlgcegcfmdnpclbng'

export const API_CONFIG = {
  BASE_URL: isDevelopment ? 'http://localhost:3000/api/' : 'https://your-production-api.com/api/',
  TIMEOUT: 10000,
  DEFAULT_HEADERS: {
    'Content-Type': 'application/json',
  },
}
