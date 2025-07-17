import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from '../components/App/App'
import './index.css'
import '../styles/reset.css'
import { getSteamTab } from '../utils/utils.js'
import { parseGameInfoFromUrl } from '../utils/utils.js'

getSteamTab().then((tab) => {
  if (!tab) return 'Закрыто'
  const gamesInfo = parseGameInfoFromUrl(tab.url)

  createRoot(document.getElementById('root')).render(
    <StrictMode>
      <App gameInfo={gamesInfo} />
    </StrictMode>,
  )
})
