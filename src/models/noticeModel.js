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
    location: { type: String, match: location, required: [true], default: "" },
    sex: {
      type: String,
      enum: gender,
      required: true,
      default: "",
    },
    price: { type: Number, default: 0 },
    category: {
      type: String,
      enum: categoryList,
      required: true,
      default: "sell",
    },
    comment: { type: String, min: 8, max: 120, default: "" },
    avatarURL: { type: String, required: false },

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

const Notice = model("notices", schema);

module.exports = Notice;
