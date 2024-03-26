const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../app");
const userSchema = require('../models/userModel');
const { adminUser, user1, user2 } = require('../utils/userDataTest');

require("dotenv").config();

/* Connecting to the database before each test. */
beforeEach(async () => {
    await mongoose.connect(process.env.MONGO_DB);
});

/* Closing database connection after each test. */
afterEach(async () => {
    await mongoose.connection.close();
});

describe('User Routes', () => {


    describe('POST /api/auth/signup', () => {
        it('should sign up a new user', async () => {
            const res = await request(app).post(`/api/auth/signup`).send(user1);
            expect(res.status).toBe(201);
            expect(res.body).toHaveProperty('username', user1.username);
            await userSchema.deleteOne({username: user1.username});
        });
    });

    describe('POST /api/auth/login', () => {
        it('should login a user', async () => {
            const res = await request(app).post(`/api/auth/login`).send(adminUser);
            expect(res.status).toBe(201);
        });
    });

    describe('GET /api/auth/logout', () => {
        it('should logout a user', async () => {
            const login = await request(app).post(`/api/auth/login`).send(adminUser);
            expect(login.status).toBe(201);
            const token = login.body.token;
            const logout = await request(app).get(`/api/auth/logout`).set({'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json'});
            expect(logout.status).toBe(200);
            expect(logout.body).toHaveProperty('message', 'Logout successfully');
        });
    });


    describe('GET /api/users', () => {
        it('should get all users', async () => {
            const login = await request(app).post(`/api/auth/login`).send(adminUser);
            expect(login.status).toBe(201);
            const token = login.body.token;
            const res = await request(app).get(`/api/users`).set({'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json'});
            expect(res.status).toBe(200);
        });
    });

    describe('GET /api/users/:userId', () => {
        it('should return a specific user', async () => {
            const login = await request(app).post(`/api/auth/login`).send(adminUser);
            expect(login.status).toBe(201);
            const token = login.body.token;
            const newuser = await userSchema.create(user1);
            const res = await request(app).get(`/api/users/${newuser._id}`).set({'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json'});
            expect(res.statusCode).toBe(200);
            expect(res.body.username).toBe("Alice123");
            await userSchema.deleteOne({username: user1.username});
        });
    });

    describe('POST /api/users/', () => {
        it('should create a new user', async () => {
            const login = await request(app).post(`/api/auth/login`).send(adminUser);
            expect(login.status).toBe(201);
            const token = login.body.token;
            const res = await request(app).post('/api/users/').set({'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json'}).send(user2);
            expect(res.status).toBe(201);
            expect(res.body).toHaveProperty('username', user2.username);
            await userSchema.deleteOne({username: user2.username});
        });
    });

    describe('PUT /api/users/:userId', () => {
        it('should update an existing user', async () => {
            const login = await request(app).post(`/api/auth/login`).send(adminUser);
            expect(login.status).toBe(201);
            const token = login.body.token;
            const newUser = await userSchema.create(user1);
            const updates = {
                "username": "Alice333",
            };
            const res = await request(app).put(`/api/users/${newUser._id}`).set({'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json'}).send(updates);
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('username', updates.username);
            await userSchema.deleteOne({username:"Alice333"});
        },20000);
    });

    describe('DELETE /api/users/:userId', () => {
        it('should delete an existing user', async () => {
            const login = await request(app).post(`/api/auth/login`).send(adminUser);
            expect(login.status).toBe(201);
            const token = login.body.token;
            const newuser = await userSchema.create(user1);
            const res = await request(app).delete(`/api/users/${newuser._id}`).set({'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json'});
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('message', 'User deleted successfully');
            await userSchema.deleteOne({username: user1.username});
        });
    });
});
