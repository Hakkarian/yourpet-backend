const { Schema, model } = require("mongoose");

const { HttpError } = require("../middlewares");
const { regExp } = require("../constants");

const location = regExp.LOCATION;

const categoryList = ["sell", "lost-found", "for-free"];
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
      min: 2,
      max: 16,
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
    birthday: { type: Date, required: true },
    breed: { type: String, min: 2, max: 16, required: true, default: "" },
    sex: {
      type: String,
      enum: gender,
      required: true,
      default: "",
    },
    location: { type: String, match: location, required: true },
    price: { type: Number, default: 0 },
    comment: { type: String, min: 8, max: 120, default: "" },
    favorite: [],
    photo: { type: String, required: true },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "users",
      require: true,
    },

    // favorite: {
    //   type: Boolean,
    //   default: false,
    // },
  },
  { versionKey: false, timestamps: true }
);

schema.pre("save", async function (error) {
  const { category, price } = this;
  if (category === "sell" && price === 0) {
    throw HttpError(400, error.message);
  }

  if (category === "for-free" && price > 0) {
    throw HttpError(400, error.message);
  }
});
schema.post("save", HttpError);

const Notice = model("notice", schema);

module.exports = Notice;
