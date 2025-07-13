/* global React */
import { Freeshka } from '../Freeshka/Freeshka.js'
import { createEl } from '../../utils/utils.js'
import { getOnlineFix, getFreetp, getGGSel, getPlati } from '../../api.js'
import { Market } from '../Market/Market.js'
import { Stats } from '../Stats/Stats.js'
import { getSteamTabs, parseGameInfoFromUrl } from '../../utils/utils.js'

function useChromeTabs() {
  const [tabs, setTabs] = React.useState([])
  React.useEffect(() => {
    async function getChromeTabs() {
      setTabs(await getSteamTabs())
    }
    getChromeTabs()
  }, [])

  return tabs
}

export function App() {
  const tabs = useChromeTabs()

  if (!tabs.length) return 'Закрыто'
  const gamesInfo = tabs.map((tab) => parseGameInfoFromUrl(tab.url))

  return createEl(
    'div',
    { className: 'app' },
    createEl('h2', { id: 'title' }, gamesInfo[0].title),
    createEl(
      'div',
      { className: 'frees' },
      createEl(Freeshka, {
        title: 'OnlineFix',
        siteUrl: 'https://online-fix.me/',
        getData: () => getOnlineFix(gamesInfo[0].title),
      }),
      createEl(Freeshka, {
        title: 'FreeTP',
        siteUrl: 'https://freetp.org/',
        getData: () => getFreetp(gamesInfo[0].title),
      }),
    ),
    createEl(Market, {
      title: 'GGSel',
      getData: () => getGGSel(gamesInfo[0].title),
      link: 'https://ggsel.net/',
    }),
    createEl(Market, {
      title: 'Plati.Market',
      getData: () => getPlati(gamesInfo[0].title),
      link: 'https://plati.market/',
    }),
    createEl(Stats, { id: gamesInfo[0].id }),
  )
}
