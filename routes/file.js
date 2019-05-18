const express = require('express');
const router = express.Router();
const fs = require('fs');
const mime = require('mime');
router.get('/api/file/:fileName', (req, res) => {
	const file = req.params.fileName;
	const filePath = './resources/' + file;
	fs.access(filePath, fs.F_OK, (err) => {
		if (err) {
			res.status(404).send();
			return;
		}
		const src = fs.createReadStream(filePath);
		res.writeHead(200, {
			'Content-Type': mime.lookup(filePath),
			'Content-Disposition': 'attachment; filename=' + file
		});
		src.pipe(res);
    
		//res.setHeader('Content-Type', mime.lookup(filePath));
		res.status(200).send();
	});
});

module.exports = router;