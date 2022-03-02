import { InterestPoint } from './interfaces';
import { server } from './server';
import request from 'supertest';
import { events } from './events';

const body: InterestPoint[] = [
    {
        lat: 48.8759992,
        lon: 2.3481253,
        name: 'Arc de triomphe'
    },
    {
        lat: 48.86,
        lon: 2.35,
        name: 'Chatelet'
    }
] as InterestPoint[];

it('Wrong routes', function(done) {
    request(server)
        .get('/wrong')
        .expect((res) => {
            expect(res.text).toBe('Wrong route...');
        })
        .expect(404, done);
});

describe('POST /interests-static', function() {
    it('Wrong content-type', function(done) {
        request(server)
            .post('/interests-static')
            .send(body.toString())
            .set('Content-Type', 'multipart/form-data')
            .expect((res) => {
                expect(res.text).toBe('Invalid content-type');
            })
            .expect(400, done);
    });

    it('Wrong JSON', function(done) {
        request(server)
            .post('/interests-static')
            .send(body[0])
            .set('Content-Type', 'application/json')
            .expect((res) => {
                expect(res.text).toBe('Invalid JSON');
            })
            .expect(400, done);
    });

    it('Good Request', function(done) {
        events.loadEvents().then(ret => {
            expect(ret).toBe(true);
            request(server)
                .post('/interests-static')
                .send(body)
                .set('Content-Type', 'application/json')
                .expect((res) => {
                    expect(res.text).toBe(JSON.stringify([
                        {
                            lat: 48.8759992,
                            lon: 2.3481253,
                            name: 'Arc de triomphe',
                            impressions: 63593,
                            clicks: 7646
                        },
                        {
                            lat: 48.86,
                            lon: 2.35,
                            name: 'Chatelet',
                            impressions: 136407,
                            clicks: 16348
                        }
                    ]));
                })
                .expect(200, done);
        });
    });
});

describe('POST /interests-live', function() {
    it('Wrong content-type', function(done) {
        request(server)
            .post('/interests-live')
            .send(body.toString())
            .set('Content-Type', 'multipart/form-data')
            .expect((res) => {
                expect(res.text).toBe('Invalid content-type');
            })
            .expect(400, done);
    });

    it('Wrong JSON', function(done) {
        request(server)
            .post('/interests-live')
            .send(body[0])
            .set('Content-Type', 'application/json')
            .expect((res) => {
                expect(res.text).toBe('Invalid JSON');
            })
            .expect(400, done);
    });

    it('Good Request', function(done) {
        events.loadEvents().then(ret => {
            expect(ret).toBe(true);
            request(server)
                .post('/interests-live')
                .send(body)
                .set('Content-Type', 'application/json')
                .expect((res) => {
                    expect(res.text).toBe(JSON.stringify([
                        {
                            lat: 48.8759992,
                            lon: 2.3481253,
                            name: 'Arc de triomphe',
                            impressions: 63593,
                            clicks: 7646
                        },
                        {
                            lat: 48.86,
                            lon: 2.35,
                            name: 'Chatelet',
                            impressions: 136407,
                            clicks: 16348
                        }
                    ]));
                })
                .expect(200, done);
        });
    });
});
