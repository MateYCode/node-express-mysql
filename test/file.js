const mocha = require('mocha');
const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = require('chai').expect;
const should = require('chai').should;
const app = require('../app.js');
let port = 4005;
chai.use(chaiHttp);
const url = 'http://localhost:' + port;





describe('Getting file by name from /file', (done) => {
	it('should return 200', (done) => {
		chai.request(url)
			.get('/api/file/test.txt')
			.end(function (err, res) {
				expect(res).to.have.status(200);
				//expect(res).to.have.property('Content-Type');
				done();
				console.log('\n');
			});
	});
});

describe('Getting file by name from /file', (done) => {
	it('Not found file should return 404', (done) => {
		chai.request(url)
			.get('/api/file/notExist.txt')
			.end(function (err, res) {
				should().exist(res.status);
				done();
				console.log('\n')
			});
	});
});