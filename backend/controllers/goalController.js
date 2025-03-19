import Goal from "../models/goals.model.js";

// Add a new goal
export const addGoal = async (req, res) => {
  const { name, targetAmount, deadline } = req.body;

  try {
    const goal = new Goal({
      user: req.user.id,
      name,
      targetAmount,
      deadline,
    });
    await goal.save();

    res.status(201).json(goal);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a goal (e.g., add savings)
export const updateGoal = async (req, res) => {
  const { id } = req.params;
  const { savedAmount } = req.body;

  try {
    const goal = await Goal.findById(id);

    if (!goal) {
      return res.status(404).json({ message: "Goal not found" });
    }

    // Ensure the goal belongs to the logged-in user
    if (goal.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized" });
    }

    // Check if adding the amount will exceed the target amount
    if (goal.savedAmount + savedAmount > goal.targetAmount) {
      return res.status(400).json({ message: "Over saved! Cannot add more savings." });
    }

    // Update the saved amount
    goal.savedAmount += savedAmount;
    goal.completed = goal.savedAmount >= goal.targetAmount;

    await goal.save();
    res.json(goal);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a goal
export const deleteGoal = async (req, res) => {
    const { id } = req.params;
  
    try {
      const goal = await Goal.findById(id);
  
      if (!goal) {
        return res.status(404).json({ message: "Goal not found" });
      }
  
      // Ensure the goal belongs to the logged-in user
      if (goal.user.toString() !== req.user.id) {
        return res.status(401).json({ message: "Not authorized" });
      }
  
      // Use findByIdAndDelete to delete the goal
      await Goal.findByIdAndDelete(id);
  
      res.json({ message: "Goal deleted" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
};

// Get all goals for the logged-in user
export const getGoals = async (req, res) => {
  try {
    const goals = await Goal.find({ user: req.user.id });
    res.json(goals);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// end of goalController.js
// Compare this snippet from backend/routes/investmentRoutes.js: