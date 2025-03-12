const mongoose = require("mongoose");

const formSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    website: {
      type: String,
      required: true,
    },
    linkedin: {
      type: String,
      required: true,
    },
    contact: {
      type: Number,
      required: true,
    },
    briefIntro: {
      type: String,
      required: true,
    },
    expert: {
      type: Array,
      required: true,
    },
    education: {
      type: Array,
      required: true,
    },
    langugae: {
      type: Array,
      required: true,
    },
    experience: {
      type: Array,
      required: false,
    },
    skills: {
      type: Array,
      required: false,
    },
    interests: {
      type: Array,
      required: true,
    },
    version: {
      type: Number,
      required: true,
    },
    active: {
      type: Boolean,
      required: true,
    },
    archieve: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const FormData = mongoose.model("FormData", formSchema);

module.exports = FormData;
