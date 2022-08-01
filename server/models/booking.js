const Joi = require('joi');
const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    eventID: String,
    userID: String,
    firstName: String,
    lastName: String,
    date: Date
});

function validateBooking(event) {
    const schema = Joi.object({
        eventID: Joi.string(),
        userID: Joi.string(),
        firstName: Joi.string(),
        lastName: Joi.string(),
        date: Joi.date()
    })
    return schema.validate(event);
}

const Booking = mongoose.model('bookings', bookingSchema);

exports.Booking = Booking;
exports.validate = validateBooking;
