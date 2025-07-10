import { App } from './components/App/App.js'
import { createEl } from './utils/utils.js'

const root = document.querySelector('.root')

ReactDOM.createRoot(root).render(createEl(App))
