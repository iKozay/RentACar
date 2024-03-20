const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../app");
const Transaction = require('../models/transactionModel');
const { transaction } = require('../utils/transactionDataTest');

require("dotenv").config();

/* Connecting to the database before each test. */
beforeEach(async () => {
    await mongoose.connect(process.env.MONGO_DB);
});

/* Closing database connection after each test. */
afterEach(async () => {
    await mongoose.connection.close();
});

describe('Transaction Routes', () => {
    describe('POST /api/transactions/add', () => {
        it('should add a new transaction', async () => {
            const res = await request(app).post('/api/transactions/add').send(transaction);
            expect(res.status).toBe(201);
            expect(res.body).toHaveProperty('name', transaction.name);
            expect(res.body).toHaveProperty('cardNumber', transaction.cardNumber);
            expect(res.body).toHaveProperty('expDate', transaction.expDate);
            expect(res.body).toHaveProperty('ccv', transaction.ccv);
            expect(res.body).toHaveProperty('amount', transaction.amount);
            expect(res.body).toHaveProperty('date', transaction.date);
            expect(res.body).toHaveProperty('status', 'approved');
            expect(res.body).toHaveProperty('userId', transaction.userId);
            expect(res.body).toHaveProperty('reservationId', transaction.reservationId);
        });
    });

    describe('GET /api/transactions', () => {
        it('should return all transactions', async () => {
            const res = await request(app).get('/api/transactions');
            expect(res.status).toBe(200);
        });
    });

    describe('GET /api/transactions/user/:id', () => {
        it('should get all transactions for a specific user', async () => {
            const res = await request(app).get(`/api/transactions/user/${transaction.userId}`);
            expect(res.status).toBe(200);
        });
    });

    describe('GET /api/transactions/reservation/:id', () => {
        it('should get a transaction by reservation ID', async () => {
            const res = await request(app).get(`/api/transactions/reservation/${transaction.reservationId}`);
            expect(res.status).toBe(200);
        });
    });

    describe('GET /api/transactions/:id', () => {
        it('should get a transaction by ID', async () => {
            // create a new transaction using mongoose model
            const newTransaction = new Transaction(transaction);
            const res = await request(app).get(`/api/transactions/${newTransaction._id}`);
            expect(res.status).toBe(200);
        });
    });
});
