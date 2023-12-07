const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

let messageCount = 0;

// Express route for serving HTML page
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Express route for serving HTML page
app.get('/createassistant', (req, res) => {
    res.sendFile(__dirname + '/index.html');
  });
  
// WebSocket connection
wss.on('connection', (ws) => {
  console.log('Client connected');

  // WebSocket message handler
  ws.on('message', (message) => {
    console.log(`Received message from client: ${message}`);

    if (message === 'end') {
      ws.send('Connection will be closed.');
      ws.close();
    } else {
      messageCount++;
      console.log(`Message count for this client: ${messageCount}`);
      ws.send(`Received message ${messageCount}: ${message}`);

      if (messageCount === 4) {
        ws.send('Communication will be terminated due to reaching message count limit.');
        ws.close();
      }
    }
  });

  // WebSocket connection close handler
  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
