const express = require('express');

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.static('app'));

app.get('*', (req, res) => { res.send(); });

app.listen(PORT, () => console.log(`CFAC Dev server @ localhost:${PORT}`)); // eslint-disable-line
