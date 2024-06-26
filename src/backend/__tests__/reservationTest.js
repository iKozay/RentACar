const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../app');
const Reservation = require('../models/reservationModel');
const { reservation } = require('../utils/reservationDataTest');

require('dotenv').config();

/* Connecting to the database before each test. */
beforeEach(async () => {
  await mongoose.connect(process.env.MONGO_DB);
});

/* Closing database connection after each test. */
afterEach(async () => {
  await mongoose.connection.close();
});


//test for returning a specific reseravation
describe('Reservation Routes', () => {
  describe('GET /api/reservations/:reservationId', () => {
    it('should return a specific reservation', async () => {
      const newReservation = await Reservation.create(reservation);
      const res = await request(app).get(`/api/reservations/${newReservation._id}`);
      expect(res.status).toBe(200);
      expect(res.body.vin).toHaveProperty('_id', '65e52b7f3a6b6fac482c8278');
    });
  });


  //test for returning all users
  describe('GET /api/reservations/', () => {
    it('should return all reservations', async () => {
      const res = await request(app).get('/api/reservations/');
      expect(res.status).toBe(200);
    });
  });


//test for retrieving a reservation for an user

  describe('GET /api/reservations/user/:userId', () => {
    it('should return all reservations for a specific user', async () => {
      const res = await request(app).get('/api/reservations/user/65e411c2751c4a87d73f4530'); // Assuming valid user ID
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    });
  });


  //test for creating a reservation
  describe('POST /api/reservations', () => {
    it('should create a new reservation', async () => {
      const res = await request(app).post('/api/reservations').send(reservation);
      expect(res.status).toBe(201);

      expect(res.body).toHaveProperty('vin'); // Check if the property exists
      expect(res.body).toHaveProperty('reservationDate'); // Check if the property exists
      expect(res.body).toHaveProperty('pickupDate'); // Check if the property exists
      expect(res.body).toHaveProperty('returnDate'); // Check if the property exists
      expect(res.body).toHaveProperty('userID'); // Check if the property exists
      expect(res.body).toHaveProperty('status'); // Check if the property exists
      expect(res.body.addons).toEqual({
        insurance: 1,
        gps: 0,
        childSeat: 2,
      });
    });
  });


//test for updating a reservation
  describe('PUT /api/reservations/:reservationId', () => {
    it('should update an existing reservation', async () => {
      const newReservation = await Reservation.create(reservation);
      const updates = {
        pickupDate: new Date(),
        returnDate: new Date(),
        status: 'checked in',
      };
      const res = await request(app).put(`/api/reservations/${newReservation._id}`).send(updates);
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('pickupDate', updates.pickupDate.toISOString());
      expect(res.body).toHaveProperty('returnDate', updates.returnDate.toISOString());
      expect(res.body).toHaveProperty('status', 'checked in');
    });
  });


  //test for deleting a reservation
  describe('DELETE /api/reservations/:reservationId', () => {
    it('should delete an existing reservation', async () => {
      const newReservation = await Reservation.create(reservation);
      const res = await request(app).delete(`/api/reservations/${newReservation._id}`);
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('message', 'Reservation canceled successfully');
    });
  });
});
