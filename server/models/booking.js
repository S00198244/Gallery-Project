const Joi = require('joi');
const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    eventID: String,
    eventTitle: String,
    userID: String,
    firstName: String,
    lastName: String,
    email: { type: String, required: true, unique: true },
    date: Date
});

function validateBooking(event) {
    const schema = Joi.object({
        eventID: Joi.string(),
        eventTitle: Joi.string(),
        userID: Joi.string(),
        firstName: Joi.string(),
        lastName: Joi.string(),
        email: Joi.string().required().email(),
        date: Joi.date()
    })
    return schema.validate(event);
}

const Booking = mongoose.model('bookings', bookingSchema);

exports.Booking = Booking;
exports.validate = validateBooking;
