const { Booking, validate } = require('../models/booking');

class bookingController{

    // Get bookings for a user

    async getBookingsByUserID(req, res)
    {
        console.log('In getBookingsByUserID');

        const userID = req.params.id;

        try {
            const bookings = await Booking.find({ userID: userID})

            if (bookings) {

                res.status(200).json(bookings);
            }
            else {
                res.status(404).json('Not found');
            }
        }
        catch (error) {
            res.status(500).json('db error')
        }
    }

    // Get bookings for an event

    async getBookingsByEventID(req, res)
    {
        console.log('In getBookingsByEventID');

        const eventID = req.params.id;

        try {
            const bookings = await Booking.find({ eventID: eventID })

            if (bookings) {

                res.status(200).json(bookings);
            }
            else {
                res.status(404).json('Not found');
            }
        }
        catch (error) {
            res.status(500).json('db error')
        }
    }

    // Add a booking

    async addBooking(req, res)
    {
        console.log('In addBooking()');

        let result = validate(req.body);

        if (result.error) {
            res.status(400).json(result.error);
            return;
        }

        try {
            console.log('Adding booking');

            let booking = new Booking(req.body);

            booking = await booking.save();

            res.status(200).json(booking);
        }
        catch {
            res.status(500).json(error);
        }
    }
}
module.exports = new bookingController();