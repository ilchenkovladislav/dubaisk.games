const isDevelopment = chrome.runtime.id === 'jlmolhnlhcjiaacmdimnfnmjohmcjeib'

const API_CONFIG = {
  BASE_URL: isDevelopment ? 'http://localhost:3000/api/' : 'https://your-production-api.com/api/',
  TIMEOUT: 10000,
  DEFAULT_HEADERS: {
    'Content-Type': 'application/json',
  },
}

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

const apiClient = new ApiClient(API_CONFIG)

async function getOnlineFix(query) {
  try {
    return await apiClient.get(`onlinefix/${query}`)
  } catch (err) {
    if (err.response) {
      const { status, data } = err.response
      return {
        success: false,
        error: {
          message: data.error || 'Server error',
          type: data.type || 'UnknownError',
          status: status,
        },
      }
    }

    return { success: false, error: err.message }
  }
}

async function getFreetp(query) {
  try {
    return await apiClient.get(`freetp/${query}`)
  } catch (err) {
    if (err.response) {
      const { status, data } = err.response
      return {
        success: false,
        error: {
          message: data.error || 'Server error',
          type: data.type || 'UnknownError',
          status: status,
        },
      }
    }

    return { success: false, error: err.message }
  }
}

window.addEventListener('load', () => {
  function Indicator({ success }) {
    let cn = 'whish__indicator'
    cn += success ? ' whish__indicator--success' : ' whish__indicator--error'
    return React.createElement('div', { className: cn })
  }

  setTimeout(async () => {
    const rootItems = document.querySelectorAll('.LSY1zV2DJSM-')

    for (const item of rootItems) {
      const root = document.createElement('div')
      root.className = 'whish__root'

      const gameInfo = item.querySelector('.Fuz2JeT4RfI-')
      const onlineFix = await getOnlineFix(gameInfo.textContent)
      const freetp = await getFreetp(gameInfo.textContent)

      const PopoverComponent = () => {
        return React.createElement(
          'div',
          { className: 'popover-container' },
          React.createElement(
            'div',
            { className: 'trigger' },
            React.createElement(Indicator, { success: onlineFix.success }),
            React.createElement(Indicator, { success: freetp.success }),
          ),
          React.createElement(
            'div',
            { className: 'popover' },
            React.createElement(
              'div',
              { className: 'popover-content' },
              React.createElement('div', { className: 'popover-title' }, 'Заголовок'),
              React.createElement(
                'p',
                null,
                'Это содержимое popover, которое появляется при наведении курсора на кнопку.',
              ),
            ),
          ),
        )
      }

      item.append(root)
      ReactDOM.createRoot(root).render(React.createElement(PopoverComponent))
    }
  }, 1000)
})
