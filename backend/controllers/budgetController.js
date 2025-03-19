import Budget from "../models/budget.model.js";

// Add a new budget
export const addBudget = async (req, res) => {
  const { category, limit } = req.body;

  try {
    const budget = new Budget({
      user: req.user.id,
      category,
      limit,
    });
    await budget.save();

    res.status(201).json(budget);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a budget (add spending)
export const updateBudget = async (req, res) => {
  const { id } = req.params;
  const { amount } = req.body;

  try {
    const budget = await Budget.findById(id);

    if (!budget) {
      return res.status(404).json({ message: "Budget not found" });
    }

    // Ensure the budget belongs to the logged-in user
    if (budget.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized" });
    }

    // Check if adding the amount will exceed the budget limit
    if (budget.spent + amount > budget.limit) {
      return res.status(400).json({ message: "Over spend! Cannot add more spending." });
    }

    // Update the spent amount
    budget.spent += amount;
    await budget.save();

    res.json(budget);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a budget
export const deleteBudget = async (req, res) => {
  const { id } = req.params;

  try {
    const budget = await Budget.findById(id);

    if (!budget) {
      return res.status(404).json({ message: "Budget not found" });
    }

    // Ensure the budget belongs to the logged-in user
    if (budget.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await Budget.findByIdAndDelete(id);
    res.json({ message: "Budget deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all budgets for the logged-in user
export const getBudgets = async (req, res) => {
  try {
    const budgets = await Budget.find({ user: req.user.id });
    res.json(budgets);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
// end of budgetController.js
