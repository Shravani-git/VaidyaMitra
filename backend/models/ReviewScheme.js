import mongoose from "mongoose";
import Doctor from "./DoctorScheme.js";

const reviewSchema = new mongoose.Schema(
  {
    doctor: {
      type: mongoose.Types.ObjectId,
      ref: "Doctor",
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    reviewText: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 0,
      max: 5,
      default: 0,
    },
  },
  { timestamps: true }
);


reviewSchema.pre(/^find/,function(next){
  this.populate({
    path:"user",
    select:"name photo",
  });
  next();
})

reviewSchema.statics.calcAverageRatings = async function (doctorId) {
  const stats = await this.aggregate([
    { $match: { doctor: doctorId } },
    {
      $group: {
        _id: '$doctor',
        numOfRating: { $sum: 1 },
        avgRating: { $avg: '$rating' },
      },
    },
  ]);

  if (stats.length > 0) {
    await Doctor.findByIdAndUpdate(doctorId, {
      totalRating: stats[0].numOfRating,
      averageRating: stats[0].avgRating,
    });
  } else {
    await Doctor.findByIdAndUpdate(doctorId, {
      totalRating: 0,
      averageRating: 0,
    });
  }
};

reviewSchema.post('save', function () {
  this.constructor.calcAverageRatings(this.doctor);
});


reviewSchema.post('save',function(){
  this.constructor.calcAverageRatings(this.doctor)
})
export default mongoose.model("Review", reviewSchema);