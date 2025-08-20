const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync");
// const ExpressError = require("../utils/ExpressError");
// const { listingSchema, reviewSchema } = require("../Schema");
const Review = require("../models/review");
const Listing = require("../models/listing");
const { validateReview, isLoggedIn, isReviewAuthor } = require("../middleware");
const reviewController = require("../contollers/review");

router.post(
  "/",
  isLoggedIn,
  validateReview,
  wrapAsync(reviewController.createReview)
);

// DELETE REVIEW ROUTE

router.delete(
  "/:reviewId",
  isLoggedIn,
  isReviewAuthor,
  wrapAsync(reviewController.destroyReview)
);

module.exports = router;
