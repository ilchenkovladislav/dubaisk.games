import { defineManifest } from '@crxjs/vite-plugin'
import pkg from './package.json'

export default defineManifest({
  manifest_version: 3,
  name: pkg.name,
  version: pkg.version,
  icons: {
    48: 'public/logo.png',
  },
  action: {
    default_icon: {
      48: 'public/logo.png',
    },
    default_popup: 'src/popup/index.html',
  },
  content_scripts: [
    {
      js: ['src/content/content.jsx'],
      matches: ['https://store.steampowered.com/wishlist/*'],
      run_at: 'document_idle',
    },
  ],
  web_accessible_resources: [
    {
      resources: ['src/assets/download.svg'],
      matches: ['https://store.steampowered.com/*'],
    },
  ],
  permissions: ['scripting', 'activeTab', 'tabs'],
  host_permissions: [
    'http://localhost:3000/',
    'http://127.0.0.1:3000/',
    'http://192.168.0.1:3000/',
    'https://ilchenkow.ru/api/',
  ],
})
