/* global React */
import { createEl } from '../../utils/utils.js'

export function Freeshka({ title, siteUrl, getData }) {
  const [isLoading, setIsLoading] = React.useState(true)
  const [data, setData] = React.useState(null)

  React.useEffect(() => {
    async function fetchData() {
      setData(await getData())
      setIsLoading(false)
    }
    fetchData()
  }, [])

  let loadingLabel = () =>
    createEl('p', { className: 'free__label free__label--loading' }, 'загрузка')

  const successLabel = () =>
    createEl('p', { className: 'free__label free__label--success' }, 'есть на сайте')

  const errorLabel = () =>
    createEl('p', { className: 'free__label free__label--error' }, 'нет на сайте')

  let successLink = () =>
    createEl(
      'a',
      { className: 'button free__link free__link--success', href: data?.data?.link },
      'перейти к игре',
    )

  let errorLink = () =>
    createEl(
      'a',
      { className: 'button free__link free__link--error', href: siteUrl },
      'перейти на сайт',
    )

  let label = loadingLabel
  let freeLink = errorLink

  if (!isLoading) {
    label = data.success ? successLabel : errorLabel

    freeLink = data.success ? successLink : errorLink
  }

  return createEl(
    'div',
    { className: 'free' },
    createEl(
      'div',
      { className: 'free__wrapper' },
      createEl('h3', { className: 'free__title' }, title),
      createEl(label),
    ),
    createEl(freeLink),
  )
}
