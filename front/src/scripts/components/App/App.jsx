import React from 'react'
import { Freeshka } from '../Freeshka/Freeshka.js'
import { getOnlineFix, getFreetp, getGGSel, getPlati } from '../../api.js'
import { Market } from '../Market/Market'
import { Stats } from '../Stats/Stats.js'

export function App({ gameInfo }) {
  const { id, title } = gameInfo

  return (
    <div className="app">
      <h2 id="title">{title}</h2>
      <div className="frees">
        <Freeshka
          title="OnlineFix"
          siteUrl="https://online-fix.me/"
          getData={() => getOnlineFix(title)}
        />
        <Freeshka title="FreeTP" siteUrl="https://freetp.org/" getData={() => getFreetp(title)} />
      </div>
      <Market
        title="GGSel"
        getData={() => getGGSel(title)}
        link={`https://ggsel.net/search/${title}`}
      />
      <Market
        title="Plati.Market"
        getData={() => getPlati(title)}
        link={`https://plati.market/search/${title}`}
      />
      <Stats id={id} />
    </div>
  )
}
