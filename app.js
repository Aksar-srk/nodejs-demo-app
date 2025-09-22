const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  const htmlResponse = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Node.js App Deployed</title>
      <style>
        * {
          box-sizing: border-box;
        }

        body {
          margin: 0;
          padding: 0;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background: linear-gradient(135deg, #74ebd5 0%, #9face6 100%);
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #333;
          overflow: hidden;
        }

        .card {
          background: white;
          padding: 40px;
          border-radius: 20px;
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
          text-align: center;
          max-width: 500px;
          width: 90%;
          animation: fadeInUp 1s ease-in-out;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .card:hover {
          transform: translateY(-10px) scale(1.03);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
        }

        h1 {
          font-size: 2.5rem;
          margin-bottom: 15px;
          color: #2c3e50;
          animation: slideDown 1s ease;
        }

        p {
          font-size: 1.1rem;
          color: #555;
          margin: 8px 0;
        }

        .version {
          margin-top: 15px;
          font-weight: bold;
          color: #3498db;
        }

        .checkmark {
          width: 90px;
          height: 90px;
          border-radius: 50%;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background-color: #ecfdf5;
          border: 4px solid #2ecc71;
          margin-bottom: 20px;
          animation: pop 0.6s ease;
        }

        .checkmark svg {
          width: 50px;
          height: 50px;
          stroke: #2ecc71;
          stroke-width: 6;
          stroke-linecap: round;
          stroke-linejoin: round;
          fill: none;
          stroke-dasharray: 100;
          stroke-dashoffset: 100;
          animation: drawCheck 1s forwards 0.3s;
        }

        @keyframes drawCheck {
          to {
            stroke-dashoffset: 0;
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes pop {
          0% {
            transform: scale(0.5);
          }
          100% {
            transform: scale(1);
          }
        }

        .btn {
          display: inline-block;
          margin-top: 25px;
          padding: 12px 25px;
          background: linear-gradient(135deg, #2ecc71, #27ae60);
          color: white;
          text-decoration: none;
          font-weight: bold;
          border-radius: 50px;
          box-shadow: 0 8px 15px rgba(46, 204, 113, 0.3);
          transition: all 0.3s ease;
        }

        .btn:hover {
          background: linear-gradient(135deg, #27ae60, #1e8449);
          transform: translateY(-3px);
          box-shadow: 0 12px 20px rgba(46, 204, 113, 0.4);
        }
      </style>
    </head>
    <body>
      <div class="card">
        <div class="checkmark">
          <svg viewBox="0 0 52 52">
            <path d="M14 27 l7 7 l17 -17"></path>
          </svg>
        </div>
        <h1>Deployment Successful!</h1>
        <p>Your Node.js app is live and running 🚀</p>
        <p class="version">Version 2.0</p>
        <a class="btn" href="https://github.com/your-repo" target="_blank">🌐 View on GitHub</a>
      </div>
    </body>
    </html>
  `;
  res.send(htmlResponse);
});

app.listen(PORT, () => {
  console.log(\`🚀 Server is running at http://localhost:${PORT}\`);
