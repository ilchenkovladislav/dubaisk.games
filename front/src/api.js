import { apiClient } from "./utils/ApiClient"

export async function getGameOnline(id) {
  try {
    const response = await apiClient.get(`online/${id}`)

    return response.data
  } catch (err) {
    console.error('Ошибка запроса:', err)
  }
}

export async function getGGSel(query) {
  try {
    const response = await apiClient.get(`ggsel/${query}`)
    return response.data
  } catch (err) {
    console.error('Ошибка запроса:', err)
    return { success: false, error: err.message }
  }
}

export async function getPlati(query) {
  try {
    const response = await apiClient.get(`plati/${query}`)
    return response.data
  } catch (err) {
    console.error('Ошибка запроса:', err)
    return { success: false, error: err.message }
  }
}

export async function getOnlineFix(query) {
  try {
    const response = await apiClient.get(`onlinefix/${query}`)
    return response.data
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

export async function getFreetp(query) {
  try {
    const response = await apiClient.get(`freetp/${query}`)
    return response.data
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
