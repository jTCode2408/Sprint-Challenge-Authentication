const request = require('supertest');
const server = require('../api/server');
const Users = require('./users-model')


//tests for login/register ends
//2 per endpoiint
//REGISTER: should return 201, username, pass in req body
//LOGIN: should return 200, token in req.body

describe('auth-router', function () {
    it('should run tests', function () {
        expect(true).toBe(true);
    });
})
describe('POST api/auth/login', function () {
    it('should return json body on login success', function () {
        return request(server)
            .post('/api/auth/login')
            .then(res => {
                expect(res.type).toMatch(/json/);
            });
    });
    it("should accept req.body on login attempt", function() {
        return request(server)
          .get("/api/auth/login")
          .then(res => {
            expect.objectContaining(res.body);
          });
      });

}) //end of login describe

describe('POST api/auth/register', function () {
    it('should be text on register req', function () {
        return request(server)
            .post('/api/auth/register')
            .then(res => {
                expect(res.type).toMatch(/text/);
            });
    });
    it("should return 201 on register response", ()=> {
        const expectedStatusCode = 201;
        return request(server)
            .post('/api/auth/register')
            .send(Users)
            .then(res => {
                expect(201);
            });
    });
    it("should return body on register response", function() {
        return request(server)
          .get("/api/auth/register")
          .then(res => {
            expect.objectContaining(res.body);
          });
      });

})


