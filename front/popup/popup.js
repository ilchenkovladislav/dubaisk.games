import {
  formatNumber,
  getCurrentTab,
  parseGameInfoFromUrl,
  isValidPage,
} from '/scripts/utils/utils.js'
import { getGameOnline, getOnlineFix, getFreetp, getGGSel, getPlati } from '/scripts/api.js'

async function drowStats(id) {
  const playersOnlineElement = document.querySelector('#current_online span')
  const todayPeakPlayersElement = document.querySelector('#max_online_today span')
  const allTimePeakPlayersElement = document.querySelector('#max_online_alltime span')
  const averagePlayersCountElement = document.querySelector('#avg_online_month span')
  const monthlyPlayersChangeElement = document.querySelector('#gain span')
  const monthlyChangePercentageElement = document.querySelector('#gain sup')
  const monthlyPeakPlayersElement = document.querySelector('#max_online_month span')

  const gameOnline = await getGameOnline(id)

  const {
    playersOnline,
    todayPeakPlayers,
    allTimePeakPlayers,
    averagePlayersCount,
    monthlyPlayersChange,
    monthlyChangePercentage,
    monthlyPeakPlayers,
  } = gameOnline

  playersOnlineElement.textContent = formatNumber(playersOnline)
  todayPeakPlayersElement.textContent = formatNumber(todayPeakPlayers)
  allTimePeakPlayersElement.textContent = formatNumber(allTimePeakPlayers)
  averagePlayersCountElement.textContent = formatNumber(averagePlayersCount)

  monthlyPlayersChangeElement.textContent = formatNumber(monthlyPlayersChange)
  monthlyChangePercentageElement.textContent = `(${monthlyChangePercentage}%)`
  if (monthlyPlayersChange > 0) {
    monthlyPlayersChangeElement.classList.add('positive')
    monthlyChangePercentageElement.classList.add('positive')
  } else {
    monthlyPlayersChangeElement.classList.add('negative')
    monthlyChangePercentageElement.classList.add('negative')
  }

  monthlyPeakPlayersElement.textContent = formatNumber(monthlyPeakPlayers)
}

const toggleElementVisibility = (element, isVisible) => {
  element.style.display = isVisible ? 'block' : 'none'
}

const setButtonLink = (button, link) => {
  button.setAttribute('href', link)
}

const showSuccessState = (elements, link) => {
  toggleElementVisibility(elements.successBtn, true)
  toggleElementVisibility(elements.errorBtn, false)
  toggleElementVisibility(elements.successLabel, true)
  toggleElementVisibility(elements.errorLabel, false)

  setButtonLink(elements.successBtn, link)
}

const showErrorState = (elements) => {
  toggleElementVisibility(elements.successBtn, false)
  toggleElementVisibility(elements.errorBtn, true)
  toggleElementVisibility(elements.successLabel, false)
  toggleElementVisibility(elements.errorLabel, true)
}

async function renderFree(root, getData) {
  const successBtn = root.querySelector('.free__link--success')
  const errorBtn = root.querySelector('.free__link--error')

  const successLabel = root.querySelector('.free__label--success')
  const loadingLabel = root.querySelector('.free__label--loading')
  const errorLabel = root.querySelector('.free__label--error')

  const result = await getData()

  toggleElementVisibility(loadingLabel, false)
  if (result.success) {
    showSuccessState({ successBtn, errorBtn, successLabel, errorLabel }, result.data.link)
  } else {
    showErrorState({ successBtn, errorBtn, successLabel, errorLabel })

    if (!result.error.hasOwnProperty('status') || result.error.status !== 404) {
      errorLabel.textContent = 'Ошибка'
    }
  }
}

function hideSkeletons(skeletons) {
  for (let i = 0; i < skeletons.length; i++) {
    skeletons[i].style.display = 'none'
  }
}

function renderProducts(products, target) {
  for (let i = 0; i < products.length; i++) {
    const { title, link, price, stats } = products[i]

    const htmlProduct = `<li class="product">
          <a href="${link}" target="_blank" class="product__link"></a>
          <div class="product__price">${price} ₽</div>
          <div class="product__sales">${stats}</div>
          <p class="product__title">${title}</p>
        </li>`

    target.innerHTML += htmlProduct
  }
}

async function renderMarket(root, getData, url) {
  const link = root.querySelector('.market__link')
  const list = root.querySelector('.market__list')
  const skeletons = root.querySelectorAll('.skeleton-loader')

  link.setAttribute('href', url)

  const result = await getData()
  hideSkeletons(skeletons)

  if (result.success) {
    renderProducts(result.data, list)
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  const tab = await getCurrentTab()

  if (isValidPage(tab.url)) {
    const { id, title } = parseGameInfoFromUrl(tab.url)

    document.querySelector('#title').textContent = title

    renderFree(document.querySelector('#onlinefix'), () => getOnlineFix(title))
    renderFree(document.querySelector('#freetp'), () => getFreetp(title))
    renderMarket(
      document.querySelector('#ggsel'),
      () => getGGSel(title),
      `https://ggsel.net/search/${title}`,
    )
    renderMarket(
      document.querySelector('#plati'),
      () => getPlati(title),
      `https://plati.market/search/${title}`,
    )
    drowStats(id)
  } else {
    const root = document.querySelector('.root')
    root.innerHTML = 'Это расширение работает только в магазине steam'
    root.style.textAlign = 'center'
  }
})
