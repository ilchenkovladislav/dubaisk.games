import { App } from '../scripts/components/App/App.jsx'
import React from 'react'
import { createRoot } from 'react-dom/client'
import { parseGameInfoFromUrl } from '../scripts/utils/utils.js'
import { getSteamTabs } from '../scripts/utils/utils.js'

getSteamTabs().then((tabs) => {
  if (!tabs.length) return 'Закрыто'
  const gamesInfo = tabs.map((tab) => parseGameInfoFromUrl(tab.url))

  const root = document.querySelector('.root')

  createRoot(root).render(<App gameInfo={gamesInfo[0]} />)
})
