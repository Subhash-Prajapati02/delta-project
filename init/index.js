const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const Mongo_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(Mongo_URL);
}

const initDB = async () => {
  await Listing.deleteMany({});
  const dataWithOwner = initData.data.map((obj) => ({
    ...obj,
    owner: new mongoose.Types.ObjectId("689f11e85dfb963be56573e6"),
  }));
  await Listing.insertMany(dataWithOwner);
  console.log("data was initialized");
};

initDB();
