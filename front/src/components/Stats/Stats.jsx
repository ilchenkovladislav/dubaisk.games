import React from 'react'
import { getGameOnline } from '../../api.js'
import { formatNumber } from '../../utils/utils.js'
import styles from './Stats.module.css'
import cn from 'classnames'

export function Stats({ id }) {
  const [data, setData] = React.useState(null)

  const stats = {
    playersOnline: 'сейчас онлайн',
    todayPeakPlayers: 'пик за 24 часа',
    allTimePeakPlayers: 'пик за все время',
    averagePlayersCount: 'средний онлайн',
    monthlyPlayersChange: 'изменение',
    monthlyPeakPlayers: 'пик онлайна',
  }

  React.useEffect(() => {
    async function fetchData() {
      setData(await getGameOnline(id))
    }
    fetchData()
  }, [])

  const isPositiveChange = data?.data?.monthlyPlayersChange > 0

  return (
    <div className={styles.stats}>
      <div>
        <h3 className={styles.title}>Общая статистика</h3>
        <ul className={styles.list}>
          <li className={styles.item}>
            {stats.playersOnline} <span>{formatNumber(data?.data?.playersOnline)}</span>
          </li>
          <li className={styles.item}>
            {stats.todayPeakPlayers} <span>{formatNumber(data?.data?.todayPeakPlayers)}</span>
          </li>
          <li className={styles.item}>
            {stats.allTimePeakPlayers} <span>{formatNumber(data?.data?.allTimePeakPlayers)}</span>
          </li>
        </ul>
      </div>
      <div>
        <h3 className={styles.title}>Статистика за месяц</h3>
        <ul className={styles.list}>
          <li className={styles.item}>
            {stats.averagePlayersCount} <span>{formatNumber(data?.data?.averagePlayersCount)}</span>
          </li>

          <li className={styles.item} id="gain">
            {stats.monthlyPlayersChange}

            <span
              className={cn(
                { [styles.positive]: isPositiveChange, [styles.negative]: !isPositiveChange },
                'change',
              )}
            >
              {formatNumber(data?.data?.monthlyPlayersChange)}
            </span>
            <sup
              className={cn(
                { [styles.positive]: isPositiveChange, [styles.negative]: !isPositiveChange },
                'changePercentage',
              )}
            >
              ({data?.data?.monthlyChangePercentage ?? ''}%)
            </sup>
          </li>
          <li className={styles.item}>
            {stats.monthlyPeakPlayers} <span>{formatNumber(data?.data?.monthlyPeakPlayers)}</span>
          </li>
        </ul>
      </div>
    </div>
  )
}
