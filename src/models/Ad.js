import { Schema, model, models } from "mongoose";

const adSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: { type: String, required: true },
    location: { type: String, required: true },
    phone: { type: String, required: true },
    price: { type: String, required: true },
    realEstate: { type: String, required: true },
    constructionDate: { type: Date, required: true },
    category: {
      type: String,
      enum: ["villa", "apartment", "store", "office"],
      required: true,
    },
    rules: {
      type: [String],
      default: [],
    },
    amenities: {
      type: [String],
      default: [],
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    published: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Ad = models.Ad || model("Ad", adSchema);

export default Ad;
