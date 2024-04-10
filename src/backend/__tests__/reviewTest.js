const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../app');

const { review } = require('../utils/reviewDataTest');

require('dotenv').config();

/* Connecting to the database before each test. */
beforeEach(async () => {
  await mongoose.connect(process.env.MONGO_DB);
});

/* Closing database connection after each test. */
afterEach(async () => {
  await mongoose.connection.close();
});

describe('GET /api/reviews/reviews', () => {
  it('should return all reviews', async () => {
    const res = await request(app).get('/api/reviews/reviews');
    expect(res.statusCode).toBe(200);
  });
});

describe('GET /api/reviews/reviews/:id', () => {
  it('should return all reviews of a specific branch', async () => {
    const res = await request(app).get(
      '/api/reviews/reviews/65fdf06fb3b11e7bc376475b',
    );
    expect(res.statusCode).toBe(200);
  });
});

describe('POST /api/reviews/add', () => {
  it('should add a review', async () => {
    const res = await request(app).post('/api/reviews/add').send(review);
    expect(res.statusCode).toBe(201);
    expect(res.body.rating).toBe(4);
  });
});

describe('PUT /api/reviews/update/:id', () => {
  it('should update a review', async () => {
    const res = await request(app)
      .put('/api/reviews/update/65fde7c296ec627a5bfaf23c')
      .send({
        rating: 3,
      });
    expect(res.statusCode).toBe(200);
    expect(res.body.rating).toBe(3);
  });
});
