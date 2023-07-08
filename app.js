const express = require('express');
const app = express();

// Serve static assets
app.use(express.static('public'));

// Set up routes
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
