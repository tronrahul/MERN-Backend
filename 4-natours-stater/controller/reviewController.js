const Review = require('./../models/reviewModel');
const catchAsync = require('./../utils/catchAsync');
const factory = require('./handleFactory');
// const conn = require('./../server');
const mongoose = require('mongoose');
const User = require('../models/userModel');

exports.getAllReviews = catchAsync(async (req, res, next) => {
  let filter = {};
  if (req.params.tourId) filter = { tour: req.params.tourId };
  const reviews = await Review.find(filter);

  res.status(200).json({
    status: 'success',
    results: reviews.length,
    data: {
      reviews,
    },
  });
});

exports.setTourUserIds = (req, res, next) => {
  // Allow nested routes
  if (!req.body.tour) req.body.tour = req.params.tourId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

exports.getUserReview = async (req, res, next) => {
  // const stats =
  await Review.aggregate([
    {
      $lookup: {
        from: 'user',
        localField: 'user',
        foreignField: '_id',
        as: 'user_review',
      },
    },
  ]).exec(function (err, res) {
    if (err) throw err;
    console.log(JSON.stringify(res));
    // db.close();
  });

  // console.log('Running', stats);

  return [];
};

exports.setUserAndReview = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const user = await User.create([req.body], { session });

    console.log('User created', user);

    const review = await Review.create([req.body], { session });
    console.log('review created', review);

    await session.commitTransaction();
    console.log('success');
    res.status(200).json({
      status: 'success',
      message: 'Both methods run successfully',
    });
  } catch (err) {
    console.log('error', err);
    res.status(400).json({
      status: 'failed',
      message: 'Both methods run failed',
    });
    await session.abortTransaction();
  }
  session.endSession();
};

exports.createReview = factory.createOne(Review);
exports.deleteReview = factory.deleteOne(Review);
exports.updateReview = factory.updateOne(Review);
