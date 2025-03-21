import axios from "axios";

export const getFinancialAdvice = async (req, res) => {
  try {
    const transactions = req.body.transactions;

    // Calculate total expenses
    const totalExpenses = transactions
      .filter((txn) => txn.type === "expense")
      .reduce((sum, txn) => sum + txn.amount, 0);

    // If user has no expenses, return early
    if (totalExpenses === 0) {
      return res.json({ advice: ["You have no expenses. Great job!"] });
    }

    // Call the Django ML service
    const mlResponse = await axios.post("http://localhost:8000/analyze/", {
      transactions,
    });

    // Extract cluster summaries from the response
    const clusterSummaries = mlResponse.data;

    // Generate advice based on cluster summaries
    const advice = [];
    if (clusterSummaries[0] > clusterSummaries[1]) {
      advice.push("You're spending more on non-essential categories. Consider cutting back.");
    } else {
      advice.push("Your spending is well-balanced. Keep it up!");
    }

    res.json({ advice });
  } catch (error) {
    console.error("Error fetching financial advice:", error);
    res.status(500).json({ error: "Failed to generate financial advice" });
  }
};