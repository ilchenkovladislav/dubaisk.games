import { Freeshka } from '../Freeshka/Freeshka'
import { getOnlineFix, getFreetp, getGGSel, getPlati } from '../../api.js'
import { Market } from '../Market/Market'
import { Stats } from '../Stats/Stats'
import styles from './App.module.css'

export function App({ gameInfo }) {
  const { id, title } = gameInfo

  return (
    <div className="app">
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.freeshki}>
        <Freeshka
          title="OnlineFix"
          siteUrl="https://online-fix.me/"
          getData={() => getOnlineFix(title)}
        />
        <Freeshka title="FreeTP" siteUrl="https://freetp.org/" getData={() => getFreetp(title)} />
      </div>
      {/* <Market
        title="GGSel"
        getData={() => getGGSel(title)}
        link={`https://ggsel.net/search/${title}`}
      /> */}
      <Market
        title="Plati.Market"
        getData={() => getPlati(title)}
        link={`https://plati.market/search/${title}`}
      />
      <Stats id={id} />
    </div>
  )
}
