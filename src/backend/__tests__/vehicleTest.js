const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../app");

const {car } = require("../utils/vehicleDataTest")

require("dotenv").config();


/* Connecting to the database before each test. */
beforeEach(async () => {
    await mongoose.connect(process.env.MONGO_DB);
  });
  
  /* Closing database connection after each test. */
  afterEach(async () => {
    await mongoose.connection.close();
  });

  describe("GET /api/vehicles/vehicles", () => {
    it("should return all products", async () => {
      const res = await request(app).get("/api/vehicles/vehicles");
      expect(res.statusCode).toBe(200);
    });
  });

  describe("GET /api/vehicles/vehicle/:id", () => {
    it("should return a product", async () => {
      const res = await request(app).get(
        "/api/vehicles/vehicle/65e52b7f3a6b6fac482c8278"
      );
      expect(res.statusCode).toBe(200);
      expect(res.body.make).toBe("Toyota");
    });
  });

  
  
  describe("POST /api/vehicles/add", () => {
    it("should create a product", async () => {
      const res = await request(app).post("/api/vehicles/add").send(car);
      expect(res.statusCode).toBe(201);
      expect(res.body.make).toBe("Jaguar");
    });
  });
  
  describe("PUT /api/vehicles/update/:id", () => {
    it("should update a product", async () => {
      const res = await request(app)
        .put("/api/vehicles/update/65e52b7f3a6b6fac482c8278")
        .send({
          price: 104,
        });
      expect(res.statusCode).toBe(200);
      expect(res.body.price).toBe(104);
    });
  });
  
  