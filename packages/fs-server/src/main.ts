import express, { Express, Request, Response } from 'express';
import { createServer, Server as HTTPServer } from 'http';
import { WebSocketServer, WebSocket } from 'ws';
import * as path from 'path';
import * as fs from 'fs';

const app: Express = express();
const httpServer: HTTPServer = createServer(app);
const wss = new WebSocketServer({ server: httpServer });

interface DirectoryStructure {
  [key: string]: string[] | DirectoryStructure;
}

console.log('FS-server ====================');

function getDirectoryStructure(dirPath: string): string[] | DirectoryStructure {
  try {
    const files = fs.readdirSync(dirPath);
    const result: string[] | DirectoryStructure = [];

    for (const file of files) {
      const filePath = path.join(dirPath, file);
      const stats = fs.statSync(filePath);

      if (stats.isDirectory()) {
        const subStructure = getDirectoryStructure(filePath);
        if (Array.isArray(subStructure)) {
          result.push(file);
        } else {
          // @ts-ignore
          result[file] = subStructure;
        }
      } else {
        result.push(file);
      }
    }

    return result;
  } catch (error) {
    console.error(`Error reading directory ${dirPath}:`, error);
    return [];
  }
}

wss.on('connection', (ws: WebSocket) => {
  console.log('Client connected');

  ws.on('message', (message: string) => {
    try {
      const parsedMessage = JSON.parse(message);

      if (parsedMessage.action === 'directories') {
        const rootDir = process.cwd(); // Current working directory
        const structure = getDirectoryStructure(rootDir);
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
