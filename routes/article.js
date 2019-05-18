const articleModel = require('../lib/models/articleModel');
const express = require('express');
const router = express.Router();
const validator = require('../lib/validator');
const articleSchema = require('./schemas/articleSchema');

router.get('/api/catalog/article/:id', (req, res)=> {
	var id = req.params.id;
	if (!isNaN(id)) {
		articleModel.getArticle(id, (error, data)=> {
			if( error ) res.sendStatus(500);
			if (typeof data !== 'undefined' && data.length > 0) {
				res.status(200).json(data);
			}
			else {
				res.status(404).json({'msg': 'article not found'});
			}
		});
	}
	else {
		res.status(400).json({ 'msg': 'Error: id  type should be an integer' });
	}    
});

router.post('/api/catalog/article', (req, res) => {
	const validationResult = validator(req.body, articleSchema);
	if (validationResult.errors === true) {
		res.status(400).json({ errors: validationResult.validationErrors });
	}
	else {
		const articleData = {
			id: null,
			title: req.body.title,
			content: req.body.description,
		};

		articleModel.insertArticle(articleData, function (error, data) {
			if (error) return res.sendStatus(500);
			res.status(200).json({ 'id': data.insertId });
		});
	}
});
module.exports = router;
