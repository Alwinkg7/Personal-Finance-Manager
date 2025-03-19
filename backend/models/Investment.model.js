import mongoose from "mongoose";


const InvestmentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to User model
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    month: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Investment = mongoose.model("Investment", InvestmentSchema);
export default Investment;