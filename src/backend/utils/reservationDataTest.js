const reservation = {
  vin: "65e52b7f3a6b6fac482c8278",
  reservationDate: new Date("2024/3/8").toISOString(),
  pickupDate: new Date("2024/3/9").toISOString(),
  returnDate: new Date("2024/3/10").toISOString(),
  userID: "65ef29928e591664663d138d",
  status: "not checked in",
  addons: {
    insurance: true,
    gps: false,
    childSeat: 2
  }
};

module.exports = { reservation };
  