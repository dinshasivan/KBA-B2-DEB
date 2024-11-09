const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'public')));

// Serve the quiz page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const Port =  3000;
app.listen(Port, () => {
  console.log(`Server running on port ${Port}`);
});