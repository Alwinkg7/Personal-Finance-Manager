import Transaction from "../models/transaction.model.js";

// Add transaction
export const addTransaction = async (req, res) => {
  try {
    const { amount, type, category, description } = req.body;

    if (!amount || !type || !category) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const transaction = new Transaction({
      user: req.user.id,
      amount,
      type,
      category,
      description,
    });

    await transaction.save();
    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get transactions of logged-in user
export const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.user.id }).sort({
      date: -1,
    });

    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete transaction
export const deleteTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    if (transaction.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await transaction.deleteOne();
    res.json({ message: "Transaction deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Compare this snippet from backend/models/user.model.js:

// Calculate Net Profit/Loss
export const getNetProfitLoss = async (req, res) => {
    try {
        const userId = req.user.id;

        // Fetch transactions for the logged-in user
        const transactions = await Transaction.find({ userId });

        let totalIncome = 0;
        let totalExpenses = 0;

        transactions.forEach(txn => {
            if (txn.type === "income") {
                totalIncome += txn.amount;
            } else if (txn.type === "expense") {
                totalExpenses += txn.amount;
            }
        });

        const netProfitLoss = totalIncome - totalExpenses;

        res.json({ totalIncome, totalExpenses, netProfitLoss });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update transaction
export const updateTransaction = async (req, res) => {
  try {
    const { amount, type, category, description, date } = req.body;

    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    if (transaction.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized" });
    }

    transaction.amount = amount;
    transaction.type = type;
    transaction.category = category;
    transaction.description = description;
    transaction.date = date;

    await transaction.save();
    res.json(transaction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// Get transactions filtered by time period
export const getTransactionsByPeriod = async (req, res) => {
  const { period } = req.query; // e.g., "today", "this-week", "this-month", etc.

  try {
    const now = new Date();
    let startDate;

    switch (period) {
      case "today":
        startDate = new Date(now.setHours(0, 0, 0, 0));
        break;
      case "this-week":
        startDate = new Date(now.setDate(now.getDate() - now.getDay()));
        break;
      case "this-month":
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        break;
      case "last-3-months":
        startDate = new Date(now.getFullYear(), now.getMonth() - 3, 1);
        break;
      case "last-6-months":
        startDate = new Date(now.getFullYear(), now.getMonth() - 6, 1);
        break;
      case "last-year":
        startDate = new Date(now.getFullYear() - 1, now.getMonth(), 1);
        break;
      default:
        return res.status(400).json({ message: "Invalid period" });
    }

    const transactions = await Transaction.find({
      user: req.user.id,
      date: { $gte: startDate },
    });

    res.json(transactions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// Compare this snippet from backend/routes/userRoutes.js: