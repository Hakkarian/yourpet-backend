const { Schema, model } = require("mongoose");

const { errorHandler } = require("../middlewares");
const { AppError } = require("../utils");
const { regExp } = require("../constants");

const location = regExp.LOCATION;
const birthday = regExp.BIRTHDAY_REG_EXP;
const categoryList = ["my-pet", "sell", "lost-found", "for-free"];
const gender = ["female", "male"];

const schema = new Schema(
  {
    category: {
      type: String,
      enum: categoryList,
      required: true,
      default: "sell",
    },
    title: {
      type: String,
      default: "What a cute  pet",
      required: [true, "title is required"],
    },
    name: {
      type: String,
      min: 2,
      max: 16,
      default: "Here's your pet's name",
      required: [true, "name is required"],
    },
    birthday: { type: String, match: birthday, required: true },
    breed: { type: String, min: 2, max: 16, required: true, default: "" },
    sex: {
      type: String,
      enum: gender,
      required: true,
      default: "",
    },
    location: { type: String, match: location, required: [true], default: "" },
    price: { type: Number, default: 0 },
    comment: { type: String, min: 8, max: 120, default: "" },
    photo: { type: String, required: true },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      require: true,
    },
  },
  { versionKey: false, timestamps: true }
);
schema.pre("save", async function (next) {
  const { category, price } = this;
  if (category === "sell" && price === 0) {
    console.log("req--->", "222");
    next();
  }

  if (category === "for-free" && price > 0) {
    console.log("res--->", "111");
  }
});
// schema.post("save", errorHandler);

const Notice = model("notices", schema);

module.exports = Notice;
