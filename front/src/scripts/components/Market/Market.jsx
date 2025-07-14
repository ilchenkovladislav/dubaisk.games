import React from 'react'
import { Skeleton } from '../Skeleton/Skeleton.js'

export function Market({ title, getData, link }) {
  const [data, setData] = React.useState(null)
  const [isLoading, setIsLoading] = React.useState(true)
  let listItems = []

  React.useEffect(() => {
    async function fetchData() {
      setData(await getData())
      setIsLoading(false)
    }
    fetchData()
  }, [])

  listItems = isLoading
    ? [React.createElement(Skeleton), React.createElement(Skeleton), React.createElement(Skeleton)]
    : data?.data?.map((product) => {
        return React.createElement(
          'li',
          { className: 'product', key: product.title },
          React.createElement('a', {
            className: 'product__link',
            href: product.link,
            target: '_blank',
          }),
          React.createElement('div', { className: 'product__price' }, `${product.price} ₽`),
          React.createElement('div', { className: 'product__sales' }, product.stats),
          React.createElement('p', { className: 'product__title' }, product.title),
        )
      })

  const Title = () => React.createElement('h3', { className: 'market__title' }, title)
  const Link = () => (
    <a className="market__link" href={link} target="_blank">
      перейти на сайт
    </a>
  )

  const marketWrapper = () =>
    React.createElement(
      'div',
      { className: 'market__wrapper' },
      React.createElement(Title),
      React.createElement(Link),
    )

  const List = () => React.createElement('ul', { className: 'market__list' }, listItems)

  return React.createElement(
    'div',
    { className: 'market' },
    React.createElement(marketWrapper),
    React.createElement(List),
  )
}
