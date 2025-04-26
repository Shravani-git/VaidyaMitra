import User from "../models/UserScheme.js";
import Booking from "../models/BookingScheme.js";    
import Doctor from "../models/DoctorScheme.js";

export const getCheckoutSession = async (req, res) => {   
    try {
        // Get currently booked doctor
        const doctor = await Doctor.findById(req.params.id);
        const user = await User.findById(req.user.id);


        // create Stripe Checkout session
const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    mode: 'payment',
    success_url: `${process.env.CLIENT_SITE_URL}/checkout-success`,
    cancel_url: `${req.protocol}://${req.get('host')}/doctors/${doctor.id}`,
    customer_email: user.email,
    client_reference_id: req.params.doctorId,
    line_items: [
      {
        price_data: {
          currency: 'bdt',
          unit_amount: doctor.ticketPrice,
          product_data: {
            name: doctor.name,
            description: doctor.bio,
            images: [doctor.photo]
          }
        },
        quantity: 1
      }
    ]
  });
  
    const booking = await Booking.create({
        user: user._id,
        doctor: doctor._id,
        ticketPrice: doctor.ticketPrice,
        sessionId: session.id,
      });
      await booking.save();
      res.status(200).json({success: true,message:"Successfully paid", session});
    } catch (error) {
        res.status(500).json({success: false,message:"Error creating session"});
    }
}