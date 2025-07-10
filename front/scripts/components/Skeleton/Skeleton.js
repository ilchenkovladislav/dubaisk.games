import { createEl } from '../../utils/utils.js'

export function Skeleton() {
  return createEl('div', { className: 'skeleton-loader' })
}
