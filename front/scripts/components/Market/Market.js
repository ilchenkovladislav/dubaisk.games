/* global React */
import { createEl } from '../../utils/utils.js'
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
    ? [createEl(Skeleton), createEl(Skeleton), createEl(Skeleton)]
    : data?.data?.map((product) => {
        return createEl(
          'li',
          { className: 'product', key: product.title },
          createEl('a', { className: 'product__link', href: product.link, target: '_blank' }),
          createEl('div', { className: 'product__price' }, product.price),
          createEl('div', { className: 'product__sales' }, product.stats),
          createEl('p', { className: 'product__title' }, product.title),
        )
      })

  const Title = () => createEl('h3', { className: 'market__title' }, title)
  const Link = () =>
    createEl('a', { className: 'market__link', href: link, target: '_blank' }, 'перейти на сайт')

  const marketWrapper = () =>
    createEl('div', { className: 'market__wrapper' }, createEl(Title), createEl(Link))

  const List = () => createEl('ul', { className: 'market__list' }, listItems)

  return createEl('div', { className: 'market' }, createEl(marketWrapper), createEl(List))
}
