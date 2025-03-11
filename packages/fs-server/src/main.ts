import express, { Express, Request, Response } from 'express';
import { createServer, Server as HTTPServer } from 'http';
import { WebSocketServer, WebSocket } from 'ws';
import { readFolderHierarchy } from './application/fsCrawler.mjs';

const app: Express = express();
const httpServer: HTTPServer = createServer(app);
const wss = new WebSocketServer({ server: httpServer });

wss.on('connection', (ws: WebSocket) => {
  console.log('Client connected');

  ws.on('message', (message: string) => {
    try {
      const parsedMessage = JSON.parse(message);

      if (parsedMessage.action === 'directories') {
        const rootDir = process.cwd(); // Current working directory
        const structure = readFolderHierarchy(rootDir);
        ws.send(JSON.stringify({ type: 'directories', data: structure }));
      }
    } catch (error) {
      console.error('Error handling message:', error);
      ws.send(JSON.stringify({ type: 'error', message: 'Invalid message format' }));
    }
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

const port = 8080;

httpServer.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
