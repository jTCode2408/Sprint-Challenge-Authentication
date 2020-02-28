const request = require('supertest');
const server = require('../api/server');


//tests for login/register ends
//2 per endpoiint
//REGISTER: should return 201, username, pass in req body
//LOGIN: should return 200, token in req.body

describe('auth-router', function () {
    it('should run tests', function () {
        expect(true).toBe(true);
    });
})
    describe('POST api/auth/register', function () {
        it('should return json body', function () {
            return request(server)
                .post('/api/auth/login')
                .then(res => {
                    expect(res.type).toMatch(/json/);
                });
        });
    })
