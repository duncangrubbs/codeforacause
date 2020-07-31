const express = require('express');

const app = express();
const port = 3000;

app.use(express.static('app'));

app.get('*', (req, res) => res.send());

app.listen(port, () => console.log(`CFAC App listening at http://localhost:${port}`)); // eslint-disable-line
