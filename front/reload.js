const socket = new WebSocket('ws://localhost:9090');

socket.addEventListener('open', () => {
  console.log('[Extension] WebSocket соединение установлено');
});

socket.addEventListener('message', (event) => {
  console.log(event.data)
  if (event.data === 'reload') {
    console.log('[Extension] Получена команда reload');
    chrome.runtime.reload();
  }
});
