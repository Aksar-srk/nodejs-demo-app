const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  // We'll build the HTML content in a variable
  const htmlResponse = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Deployment Successful!</title>
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          margin: 0;
          background-color: #f0f2f5;
          color: #333;
        }
        .container {
          text-align: center;
          background-color: white;
          padding: 40px 60px;
          border-radius: 10px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }
        h1 {
          color: #2c3e50;
          font-size: 2.5em;
        }
        p {
          color: #7f8c8d;
          font-size: 1.2em;
        }
        .version {
          margin-top: 20px;
          font-size: 1em;
          color: #3498db;
          font-weight: bold;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>🚀 Success! 🚀</h1>
        <p>Your Node.js application has been deployed.</p>
        <p class="version">Version 2.0</p>
      </div>
    </body>
    </html>
  `;

  // Use res.send() to deliver the HTML content
  res.send(htmlResponse);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});