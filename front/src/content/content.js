import React from 'react'
import { createRoot } from 'react-dom/client'
import { App } from '../scripts/components/App/App.jsx'
import { getOnlineFix, getFreetp } from '../scripts/api.js'
import { parseGameInfoFromUrl } from '../scripts/utils/utils.js'

window.addEventListener('load', async () => {
  function Indicator({ success }) {
    let cn = 'whish__indicator'
    cn += success ? ' whish__indicator--success' : ' whish__indicator--error'
    return React.createElement('div', { className: cn })
  }

  const rootItems = document.querySelectorAll('.LSY1zV2DJSM-')

  for (const item of rootItems) {
    const root = document.createElement('div')
    root.className = 'whish__root'

    const gameEl = item.querySelector('.Fuz2JeT4RfI-')
    const gameInfo = parseGameInfoFromUrl(gameEl.getAttribute('href'))
    const onlineFix = await getOnlineFix(gameInfo.title)
    const freetp = await getFreetp(gameInfo.title)

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
            React.createElement(App, { gameInfo }),
          ),
        ),
      )
    }

    item.append(root)
    createRoot(root).render(React.createElement(PopoverComponent))
  }
})
