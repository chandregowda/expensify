const path = require('path');
const express = require('express');

const app = express();

const PORT = process.env.PORT || 3000;
const publicPath = path.resolve(__dirname, '..', 'public');
app.use(express.static(publicPath));

app.get('*', (req, res) => {
	res.sendFile(path.resolve(publicPath, 'index.html'));
});
app.listen(PORT, () => {
	console.log('Listining to PORT: ', PORT);
});
