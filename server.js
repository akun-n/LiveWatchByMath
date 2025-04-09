const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

let n = 1230;

// Update `n` every 0.2 seconds and broadcast to WebSocket clients
setInterval(() => {
    n -= 0.020944;
    wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(n.toFixed(6)));
        }
    });
}, 200);

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Make the server listen on the dynamic port provided by Heroku
const port = process.env.PORT || 3000;
server.listen(port, () => console.log(`Server running on http://localhost:${port}`));
