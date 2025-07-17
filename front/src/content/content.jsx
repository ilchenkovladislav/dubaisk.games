import { createRoot } from 'react-dom/client'
import { App } from '../components/App/App'
import { getOnlineFix, getFreetp } from '../api.js'
import { parseGameInfoFromUrl } from '../utils/utils.js'
import './content.css'
import '../styles/reset.css'
import '../popup/index.css'
import cn from 'classnames'

// Множество для отслеживания уже обработанных элементов
const processedElements = new Set()

function Indicator({ success }) {
  return (
    <div
      className={cn('whish__indicator', {
        'whish__indicator--success': success,
        'whish__indicator--error': !success,
      })}
    ></div>
  )
}

async function processGameElement(gameElement) {
  // Проверяем, не был ли элемент уже обработан
  if (processedElements.has(gameElement)) {
    return
  }

  // Помечаем элемент как обработанный
  processedElements.add(gameElement)

  const gameTitleBlock = gameElement.querySelector('.Fuz2JeT4RfI-')
  if (!gameTitleBlock) return

  const gameInfo = parseGameInfoFromUrl(gameTitleBlock.getAttribute('href'))
  const onlineFix = await getOnlineFix(gameInfo.title)
  const freetp = await getFreetp(gameInfo.title)

  const PopoverComponent = () => {
    return (
      <div className="popover-container">
        <div className="trigger">
          <Indicator success={onlineFix.success} />
          <Indicator success={freetp.success} />
        </div>
        <div className="popover">
          <div className="popover-content">
            <App gameInfo={gameInfo} />
          </div>
        </div>
      </div>
    )
  }

  const root = document.createElement('div')
  root.className = 'whish__root'
  gameElement.append(root)
  createRoot(root).render(<PopoverComponent />)
}

async function processAllGameElements() {
  const gameElements = document.querySelectorAll('.LSY1zV2DJSM-')

  for (const gameElement of gameElements) {
    await processGameElement(gameElement)
  }
}

function setupMutationObserver() {
  const observer = new MutationObserver((mutations) => {
    let hasNewElements = false

    mutations.forEach((mutation) => {
      // Проверяем добавленные узлы
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType === Node.ELEMENT_NODE) {
          // Проверяем, является ли добавленный узел игровым элементом
          if (node.classList && node.classList.contains('LSY1zV2DJSM-')) {
            hasNewElements = true
          }
          // Проверяем, содержит ли добавленный узел игровые элементы
          else if (node.querySelectorAll) {
            const gameElements = node.querySelectorAll('.LSY1zV2DJSM-')
            if (gameElements.length > 0) {
              hasNewElements = true
            }
          }
        }
      })

      // Также проверяем удаленные узлы для очистки Set
      mutation.removedNodes.forEach((node) => {
        if (node.nodeType === Node.ELEMENT_NODE) {
          if (node.classList && node.classList.contains('LSY1zV2DJSM-')) {
            processedElements.delete(node)
          } else if (node.querySelectorAll) {
            const gameElements = node.querySelectorAll('.LSY1zV2DJSM-')
            gameElements.forEach(el => processedElements.delete(el))
          }
        }
      })
    })

    // Если обнаружены новые элементы, обрабатываем их
    if (hasNewElements) {
      processAllGameElements()
    }
  })

  // Начинаем наблюдение за изменениями в DOM
  observer.observe(document.body, {
    childList: true,
    subtree: true
  })

  return observer
}

async function init() {
  await new Promise(resolve => setTimeout(resolve, 3000))

  // Обрабатываем существующие элементы
  await processAllGameElements()

  // Настраиваем наблюдение за изменениями
  setupMutationObserver()
}

if (document.readyState === 'complete') {
  init()
} else {
  window.addEventListener('load', init)
}
