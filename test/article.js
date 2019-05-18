/* eslint-disable no-console */
//const mocha=require('mocha');
const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = require('chai').expect;
const app = require('../app.js');
let port = 4005;
chai.use(chaiHttp);
const url = 'http://localhost:'+ port;

describe('Get an article from catalog from MySql db', (done) => {
	it('should get 200', (done) => {
		chai.request(url)
			.get('/api/catalog/article/10')
			.end(function (err, res) {
				expect(res).to.have.status(200);
				done();	
			});
	});
	it('should get valid json', (done) => {
		chai.request(url)
			.get('/api/catalog/article/5')
			.end(function (err, res) {
				expect(res.body[0]).to.have.all.keys('id','title','content','date');
				expect(res.body[0].title).to.be.a('string').that.is.not.empty;
				done();	
			});
	});
});
describe('Insert an article in Catalog to MySql db', (done) => {
	it('should get 200', (done) => {
		chai.request(url)
			.post('/api/catalog/article')
			.send({'title':'An article from test suite','description':'This record is generated for testing purposes'})
			.end(function (err, res) {
				expect(res).to.have.status(200);
				expect(res.body).to.have.key('id');
				expect(res.body.id).to.be.a('number');
				expect(res.body.id % 1).to.equal(0);
				done();	
			});
	});
	it('should get 400', (done) => {
		chai.request(url)
			.post('/api/catalog/article')
			.send({'title':'','description':'','extraProperty':''})
			.end(function (err, res) {
				expect(res).to.have.status(400);
				done();	
			});
	});
});