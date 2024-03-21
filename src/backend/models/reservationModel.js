const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reservationSchema = new Schema({
                    
                    vin: {
                        type: Schema.Types.ObjectId,
                        ref:"Vehicle",
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
                    },
                    status: {
                        type: String,
                        enum: ['not checked in', 'checked in', 'checked out'],
                        default: 'not checked in'
                    },
                    addons: {
                        insurance: {
                            type: Boolean,
                            required: true
                        },
                        gps: {
                            type: Boolean,
                            required: true
                        },
                        childSeat: {
                            type: Number,
                            required: true
                        }
                    }
                    }, { timestamps: true });

module.exports = mongoose.model('Reservation', reservationSchema);


