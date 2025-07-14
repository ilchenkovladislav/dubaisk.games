// watcher.js (ES-модуль)
import chokidar from 'chokidar';
import WebSocket, { WebSocketServer } from 'ws';

const EXTENSION_DIR = '/home/ilchenko/GitHub/dubaisk.games/front/build';

const wss = new WebSocketServer({ port: 9090 });

console.log('✅ WebSocket сервер запущен на порту 9090');

// Создаем watcher один раз вне обработчика подключений
const watcher = chokidar.watch(EXTENSION_DIR, {
  ignored: /(^|[\/\\])\../,
  ignoreInitial: true,
});

// Множество для хранения всех активных подключений
const clients = new Set();

watcher.on('all', (event, filePath) => {
  console.log(`📁 Файл изменён: ${filePath}`);

  // Отправляем сообщение всем подключенным клиентам
  clients.forEach(ws => {
    if (ws.readyState === WebSocket.OPEN) {
      ws.send('reload');
    }
  });
});

wss.on('connection', (ws) => {
  console.log('🔌 Расширение подключилось к WebSocket');

  // Добавляем клиента в множество
  clients.add(ws);

  ws.on('close', () => {
    console.log('❌ Расширение отключилось от WebSocket');
    // Удаляем клиента из множества при отключении
    clients.delete(ws);
  });
});

// Обработка завершения процесса
process.on('SIGINT', () => {
  console.log('\n🛑 Завершение работы...');
  watcher.close();
  wss.close();
  process.exit(0);
});
