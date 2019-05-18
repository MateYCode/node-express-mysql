/* eslint-disable no-console */
const mocha=require('mocha');
const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = require('chai').expect;
const app = require('../app.js');
let port = 4005;
chai.use(chaiHttp);
const url = 'http://localhost:'+ port;

describe('Posting JSON to /api/item', (done) => {
	it('should post json', (done) => {
		chai.request(url)
			.post('/api/item')
			.send({'id':5,'name':'John Doe','languages':['Python', 'Node', 'C']})
			.end(function (err, res) {
				console.log('Res.body:',res.body);
				expect(res).to.have.status(200);
				//expect(res.body).to.be.a()
				expect(res.body).to.have.all.keys('id','name','languages');
				expect(res.body.languages).to.be.an('array').that.is.not.empty;
				done();
				console.log('\n');
			});
	});
	it('should there not be an empty array in json property',(done)=>{
		chai.request(url)
			.post('/api/item')
			.send({'id':5,'name':'Croacia','languages':[]})
			.end(function (err, res) {
				console.log('Res.body:',res.body);
				expect(res.body).to.have.key('errors');
				expect(res).to.have.status(400);
				done();
				console.log('\n');
			});
	});
	it('should receive bad type property error', (done) => {
		chai.request(url)
			.post('/api/item')
			.send({'id':'5','name':'Croacia','languages':[2017, 'days', 10]})
			.end(function (err, res) {
				console.log('Res.body:',res.body);
				expect(res).to.have.status(400);
				done();
				console.log('\n');
			});
	});
	it('should receive wrong properties error', (done) => {
		chai.request(url)
			.post('/api/item')
			.send({country: 'Madrid', content: '2010, days: 10'})
			.end(function (err, res) {
				console.log('Res.body:',res.body);
				expect(res).to.have.status(400);
				done();
                       
			});
	});
});
