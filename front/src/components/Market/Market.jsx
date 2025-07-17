import { useState, useEffect } from 'react'
import { Skeleton } from '../Skeleton/Skeleton'
import styles from './Market.module.css'

export function Market({ title, getData, link }) {
  const [data, setData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  let listItems = []

  useEffect(() => {
    async function fetchData() {
      setData(await getData())
      setIsLoading(false)
    }
    fetchData()
  }, [])

  listItems = isLoading
    ? [<Skeleton />, <Skeleton />, <Skeleton />]
    : data?.data?.map((product) => {
        return (
          <li className={styles.product} key={product.title}>
            <a className={styles.productLink} href={product.link} target="_blank"></a>
            <div className={styles.price}>{product.price} ₽</div>
            <div className={styles.sales}>{product.stats}</div>
            <p className={styles.title}>{product.title}</p>
          </li>
        )
      })

  return (
    <div className={styles.market}>
      <div className={styles.wrapper}>
        <h3>{title}</h3>
        <a className={styles.link} href={link} target="_blank">
          перейти на сайт
        </a>
      </div>
      <ul className={styles.list}>{listItems}</ul>
    </div>
  )
}
