export default function Home() {
  const socket = new WebSocket('ws://localhost:8080');

  socket.addEventListener('open', () => {
    socket.send(JSON.stringify({ action: 'directories' }));
  });

  socket.addEventListener('message', (event) => {
    const message = JSON.parse(event.data);
    if (message.type === 'directories') {
      console.log('Directory structure:', message.data);
    } else if (message.type === 'error') {
      console.error('Error from server: ', message.message);
    }
  });

  return <div>wfow</div>;
}
