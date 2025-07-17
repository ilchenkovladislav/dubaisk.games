import { useState, useEffect } from 'react'
import styles from './Freeshka.module.css'
import cn from 'classnames'

export function Freeshka({ title, siteUrl, getData }) {
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState(null)

  useEffect(() => {
    async function fetchData() {
      setData(await getData())
      setIsLoading(false)
    }
    fetchData()
  }, [])

  const loadingLabel = <p className={cn(styles.label, styles.loading)}>загрузка</p>
  const successLabel = <p className={cn(styles.label, styles.success)}>есть на сайте</p>
  const errorLabel = <p className={cn(styles.label, styles.error)}>нет на сайте</p>

  const successLink = (
    <a className={cn('button', styles.link)} href={data?.data?.link} target="_blank">
      перейти к игре
    </a>
  )
  const errorLink = (
    <a className={cn('button', styles.link)} href={siteUrl} target="_blank">
      перейти на сайт
    </a>
  )

  let label = loadingLabel
  let freeLink = errorLink

  if (!isLoading) {
    label = data.success ? successLabel : errorLabel
    freeLink = data.success ? successLink : errorLink
  }

  return (
    <div className={styles.freeshka}>
      <div className={styles.wrapper}>
        <h3 className={styles.title}>{title}</h3>
        {label}
      </div>
      {freeLink}
    </div>
  )
}
