const mongoose = require("mongoose");

async function connected() {
  await mongoose.connect(
    "mongodb+srv://stinger:QZ0ySHUtwXK8iEsP@cluster0.ybpoq1d.mongodb.net/?retryWrites=true&w=majority"
  );
  console.log("connected to database");
}

module.exports = { connected };
