const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reservationSchema = new Schema({
                    reservationID: {
                        type: String,
                        required: true,
                        unique: true
                    },
                    vin: {
                        type: String,
                        required: true
                    },
                    reservationDate: {
                        type: Date,
                        required: true
                    },
                    pickupDate: {
                        type: Date,
                        required: true
                    },
                    returnDate: {
                        type: Date,
                        required: true
                    },
                    userID: {
                        type: Schema.Types.ObjectId,
                        ref: 'User',
                        required: true
                    }
                    }, { timestamps: true });

module.exports = mongoose.model('Reservation', reservationSchema);


