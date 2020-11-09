import { HttpStatus } from '@nestjs/common';
import * as request from 'supertest';
import { app } from './constants';

describe('HealthController (e2e)', () => {
  it('should return status ok', () => {
    return request(app)
      .get('/health')
      .expect(({ body }) => {
        expect(body.status).toBe('ok');
      })
      .expect(HttpStatus.OK);
  });
});
