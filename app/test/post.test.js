const request = require('supertest');
const app = require('../app');

describe('creating test', () => {
    it('should accept post requests and reply with 201 status', async (done) => {
        const res = await request(app)
            .post('/events')
            .send({
                userId: 1,
                title: 'test is cool',
            })
            expect(res.statusCode).toEqual(201)
            done();
    })
})