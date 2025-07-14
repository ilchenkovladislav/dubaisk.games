import React from 'react'

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
    React.createElement('p', { className: 'free__label free__label--loading' }, 'загрузка')

  const successLabel = () =>
    React.createElement('p', { className: 'free__label free__label--success' }, 'есть на сайте')

  const errorLabel = () =>
    React.createElement('p', { className: 'free__label free__label--error' }, 'нет на сайте')

  let successLink = () =>
    React.createElement(
      'a',
      { className: 'button free__link free__link--success', href: data?.data?.link },
      'перейти к игре',
    )

  let errorLink = () =>
    React.createElement(
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

  return React.createElement(
    'div',
    { className: 'free' },
    React.createElement(
      'div',
      { className: 'free__wrapper' },
      React.createElement('h3', { className: 'free__title' }, title),
      React.createElement(label),
    ),
    React.createElement(freeLink),
  )
}
