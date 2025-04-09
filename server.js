const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

let n = 1230;

setInterval(() => {
    n -= 0.020944;
    wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(n.toFixed(6)));
        }
    });
}, 200);

app.use(express.static('public'));

server.listen(3000, () => console.log('Server running on http://localhost:3000'));
