import Investment from '../models/investment.model.js';

// Get all investments
export const getInvestments = async (req, res) => {
  try {
    const investments = await Investment.find();
    res.json(investments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add a new investment
export const addInvestment = async (req, res) => {
  const { month, amount } = req.body;

  try {
    // Extract the user ID from the request (assuming it's added by the auth middleware)
    const userId = req.user.id;

    // Create a new investment with the user ID
    const newInvestment = new Investment({ month, amount, user: userId });
    await newInvestment.save();

    res.status(201).json(newInvestment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

