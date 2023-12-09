import mongoose from "mongoose";
import Joi from "joi";

// Category Schema
const CategorySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
      unique:true
    },
  },
  { timestamps: true }
);

// Category Model
const Category = mongoose.model("Category", CategorySchema);

// Validate Create Category
function validateCreateCategory(obj) {
  const schema = Joi.object({
    title: Joi.string().trim().required().label("Title")
  });
  return schema.validate(obj);
}

export { Category, validateCreateCategory };