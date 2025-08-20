const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const Listing = require("../models/listing");
const { isLoggedIn, isOwner, validateListing } = require("../middleware");
const listingContoller = require("../contollers/listing");
const multer = require("multer");
const { storage } = require("../cloudConfig");
const upload = multer({ storage });

router.get("/", wrapAsync(listingContoller.index));

// NEW ROUTE

router.get("/new", isLoggedIn, listingContoller.renderNewForm);

// SHOW ROUTE

router.get("/:id", wrapAsync(listingContoller.showListing));

// CREATE ROUTE

// router.post(
//   "/",
//   isLoggedIn,
//   validateListing,
//   wrapAsync(async (req, res, next) => {
//     const newlisting = new Listing(req.body.listing);
//     await newlisting.save();
//     req.flash("success", "New Listing Created!");
//     res.redirect("/listings");
//   })
// );

router.post(
  "/",
  isLoggedIn,
  validateListing,
  upload.single("listing[image]"),
  wrapAsync(listingContoller.createListing)
);

// EDIT ROUTE

router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingContoller.editRenderForm)
);

// UPDATE ROUTE

router.put(
  "/:id",
  isLoggedIn,
  isOwner,
  upload.single("listing[image]"),
  validateListing,
  wrapAsync(listingContoller.updateListing)
);

// DELETE ROUTE

router.delete(
  "/:id",
  isLoggedIn,
  isOwner,
  wrapAsync(listingContoller.destroyListing)
);

module.exports = router;
