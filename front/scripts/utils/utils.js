/* global chrome */
/* global React */

export function parseGameInfoFromUrl(url) {
  const match = url.match(/https:\/\/store\.steampowered\.com\/app\/(\d+)\/([^/]+)\//)

  const id = match[1]
  const title = match[2].replaceAll('_', ' ')

  return { id, title }
}

export async function getCurrentTab() {
  if (typeof chrome === 'undefined' || !chrome.tabs) {
    console.error('Chrome API is not available in this context')
    return null
  }
  try {
    const tabs = await chrome.tabs.query({})
    const steamTabs = tabs.filter((tab) => isValidPage(tab.url))

    const activeTab = steamTabs.find((tab) => tab.active)

    if (activeTab) {
      return activeTab
    }

    return steamTabs[steamTabs.length - 1]
  } catch (error) {
    console.error('Error getting current tab:', error)
    return null
  }
}

export async function getSteamTabs() {
  if (typeof chrome === 'undefined' || !chrome.tabs) {
    console.error('Chrome API is not available in this context')
    return null
  }
  try {
    const tabs = await chrome.tabs.query({})
    const steamTabs = tabs.filter((tab) => isValidPage(tab.url))

    return steamTabs
  } catch (error) {
    console.error('Error getting current tab:', error)
    return null
  }
}

export function formatNumber(number) {
  if (!number) return ''
  return new Intl.NumberFormat('ru-RU').format(number)
}

export function isValidPage(url) {
  const pattern = /^https:\/\/store\.steampowered\.com\/app\/\d+\/[^/]+\/?$/
  return pattern.test(url)
}

export const createEl = React.createElement
