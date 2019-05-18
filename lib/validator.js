const Validator = require('jsonschema').Validator;
const v = new Validator();
const validationResult = (reqBody, itemSchema) => {
	const validation=(v.validate(reqBody, itemSchema));
	if (validation.errors && validation.errors.length > 0) {
		const validationErrors = validation.errors.map(item => {
			return item.stack.split('.').pop();
		});
		return {errors: true,validationErrors};
	}
	else {
		return {errors:false};
	}
};
module.exports = validationResult;