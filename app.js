const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const itemRouter = require('./routes/item');
const fileRouter= require('./routes/file');
const postRouter= require('./routes/article');

const app = express();
const PORT = 4005;

app.use(helmet());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(itemRouter);
app.use(fileRouter);
app.use(postRouter);

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
	
	if (err.type === 'entity.parse.failed') {
		res.status(400).json({
			'error': true,
			'message': 'Invalid JSON'
		});
		res.send();
	} else {
		res.status(500).send(err);
	}
});

app.listen(PORT, () => {
	// eslint-disable-next-line no-console
	console.log(`running on PORT ${PORT}...`);
});


