import React from 'react'
import { getGameOnline } from '../../api.js'
import { formatNumber } from '../../utils/utils.js'

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

  const MainTitle = () =>
    React.createElement('h3', { className: 'stats__title' }, 'Общая статистика')

  const MainList = () =>
    React.createElement(
      'ul',
      { className: 'stats__list' },
      React.createElement(
        'li',
        { className: 'stats__item' },
        stats.playersOnline,
        React.createElement('span', {}, formatNumber(data?.playersOnline)),
      ),
      React.createElement(
        'li',
        { className: 'stats__item' },
        stats.todayPeakPlayers,
        React.createElement('span', {}, formatNumber(data?.todayPeakPlayers)),
      ),
      React.createElement(
        'li',
        { className: 'stats__item' },
        stats.allTimePeakPlayers,
        React.createElement('span', {}, formatNumber(data?.allTimePeakPlayers)),
      ),
    )

  const MonthTitle = () =>
    React.createElement('h3', { className: 'stats__title' }, 'Статистика за месяц')
  const MonthList = () =>
    React.createElement(
      'ul',
      { className: 'stats__list' },
      React.createElement(
        'li',
        { className: 'stats__item' },
        stats.averagePlayersCount,
        React.createElement('span', {}, formatNumber(data?.averagePlayersCount)),
      ),
      React.createElement(
        'li',
        { className: 'stats__item', id: 'gain' },
        stats.monthlyPlayersChange,
        React.createElement(
          'span',
          { className: data?.monthlyPlayersChange > 0 ? 'positive' : 'negative' },
          formatNumber(data?.monthlyPlayersChange),
        ),
        React.createElement(
          'sup',
          { className: data?.monthlyPlayersChange > 0 ? 'positive' : 'negative' },
          `(${data?.monthlyChangePercentage ?? ''}%)`,
        ),
      ),
      React.createElement(
        'li',
        { className: 'stats__item' },
        stats.monthlyPeakPlayers,
        React.createElement('span', {}, formatNumber(data?.monthlyPeakPlayers)),
      ),
    )

  return React.createElement(
    'div',
    { className: 'stats' },
    React.createElement('div', {}, React.createElement(MainTitle), React.createElement(MainList)),
    React.createElement('div', {}, React.createElement(MonthTitle), React.createElement(MonthList)),
  )
}
