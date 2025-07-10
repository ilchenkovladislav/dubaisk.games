/* global React */
import { createEl } from '../../utils/utils.js'
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

  const MainTitle = () => createEl('h3', { className: 'stats__title' }, 'Общая статистика')

  const MainList = () =>
    createEl(
      'ul',
      { className: 'stats__list' },
      createEl(
        'li',
        { className: 'stats__item' },
        stats.playersOnline,
        createEl('span', {}, formatNumber(data?.playersOnline)),
      ),
      createEl(
        'li',
        { className: 'stats__item' },
        stats.todayPeakPlayers,
        createEl('span', {}, formatNumber(data?.todayPeakPlayers)),
      ),
      createEl(
        'li',
        { className: 'stats__item' },
        stats.allTimePeakPlayers,
        createEl('span', {}, formatNumber(data?.allTimePeakPlayers)),
      ),
    )

  const MonthTitle = () => createEl('h3', { className: 'stats__title' }, 'Статистика за месяц')
  const MonthList = () =>
    createEl(
      'ul',
      { className: 'stats__list' },
      createEl(
        'li',
        { className: 'stats__item' },
        stats.averagePlayersCount,
        createEl('span', {}, formatNumber(data?.averagePlayersCount)),
      ),
      createEl(
        'li',
        { className: 'stats__item', id: 'gain' },
        stats.monthlyPlayersChange,
        createEl(
          'span',
          { className: data?.monthlyPlayersChange > 0 ? 'positive' : 'negative' },
          formatNumber(data?.monthlyPlayersChange),
        ),
        createEl(
          'sup',
          { className: data?.monthlyPlayersChange > 0 ? 'positive' : 'negative' },
          `(${data?.monthlyChangePercentage ?? ''}%)`,
        ),
      ),
      createEl(
        'li',
        { className: 'stats__item' },
        stats.monthlyPeakPlayers,
        createEl('span', {}, formatNumber(data?.monthlyPeakPlayers)),
      ),
    )

  return createEl(
    'div',
    { className: 'stats' },
    createEl('div', {}, createEl(MainTitle), createEl(MainList)),
    createEl('div', {}, createEl(MonthTitle), createEl(MonthList)),
  )
}
