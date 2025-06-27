import request from 'supertest';
import { app } from '../index';
import { Request, Response, NextFunction } from 'express'; // Import the necessary types

describe('GET /', () => {
    it('responds with API status JSON', async () => {
        const response = await request(app).get('/');
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('success', true);
        expect(response.body).toHaveProperty('message', 'API del Sistema ATS funcionando correctamente');
        expect(response.body).toHaveProperty('version');
        expect(response.body).toHaveProperty('timestamp');
    });
});
