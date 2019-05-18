var express = require('express');
var router = express.Router();
const itemSchema = require('./schemas/itemSchema');
const validator = require('../lib/validator');
router.post('/api/item', (req, res) => {
	const validationResult = validator(req.body, itemSchema);
	if (validationResult.errors === true) {
		res.status(400).json({ errors: validationResult.validationErrors});
	}
	else {
		const returnValue = { ...req.body, languages: [...new Set(req.body.languages)] };
		res.send(returnValue);
	}
});

module.exports = router;