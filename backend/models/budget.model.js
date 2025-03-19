import mongoose from "mongoose";


const BudgetSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  limit: {
    type: Number,
    required: true,
  },
  spent: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Budget = mongoose.model("Budget", BudgetSchema);
export default Budget;
// end of budget.model.js