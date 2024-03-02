const Review = require('../Models/Review');
const User = require('../Models/user');

const { StatusCodes } = require('http-status-codes');



const createReview = async (req, res) => {
  console.log(req.body)
  const { lawyer: lawyerId } = req.body;

  const isValidLawyer = await User.findOne({ _id: lawyerId });

  if (!isValidLawyer) {
    res.status(StatusCodes.NOT_FOUND).json({ msg : `No lawyer with id : ${lawyerId}` });
  }

  const alreadySubmitted = await Review.findOne({
    lawyer: lawyerId,
    user: req.user.userId,
  });

  if (alreadySubmitted) {
    res.status(StatusCodes.BAD_REQUEST).json({ msg : 'Already submitted review for this lawyer' });
  }

  req.body.user = req.user.id;
  console.log(req.body)
  console.log(req.body.user)
  const review = await Review.create(req.body);
  res.status(StatusCodes.CREATED).json({ review });
};
const getAllReviews = async (req, res) => {
  const reviews = await Review.find({}).populate({
    path: 'lawyer',
    select: 'fullName email',
  });

  res.status(StatusCodes.OK).json({ reviews, count: reviews.length });
};
const getSingleReview = async (req, res) => {
  const { id: reviewId } = req.params;

  const review = await Review.findOne({ _id: reviewId });

  if (!review) {
    res.status(StatusCodes.NOT_FOUND).json({ msg: `No review with id ${reviewId}`});
  }

  res.status(StatusCodes.OK).json({ review });
};

const updateReview = async (req, res) => {
  const { id: reviewId } = req.params;
  const { rating, title, comment } = req.body;

  const review = await Review.findOne({ _id: reviewId });

  if (!review) {
    res.status(StatusCodes.NOT_FOUND).json({ msg: `No review with id ${reviewId}`});
  }

  // checkPermissions(req.user, review.user);

  review.rating = rating;
  review.title = title;
  review.comment = comment;

  await review.save();
  res.status(StatusCodes.OK).json({ review });
};
const deleteReview = async (req, res) => {
  const { id: reviewId } = req.params;

  // const review = await Review.findOne({ _id: reviewId });
  const review = await Review.deleteOne({ _id: reviewId });


  if (!review) {
    res.status(StatusCodes.NOT_FOUND).json({ msg: `No review with id ${reviewId}`});
  }

  // checkPermissions(req.user, review.user);
  // try {
  //   console.log(review)

  //   await review.remove();
  // }catch(error) {
  //   res.json({ error });
  // }
  res.status(StatusCodes.OK).json({ msg: 'Success! Review removed' });
};

const getSingleLawyerReviews = async (req, res) => {
  const { id: lawyerId } = req.params;
  const reviews = await Review.find({ lawyer: lawyerId });
  res.status(StatusCodes.OK).json({ reviews, count: reviews.length });
};

module.exports = {
  createReview,
  getAllReviews,
  getSingleReview,
  updateReview,
  deleteReview,
  getSingleLawyerReviews,
};
