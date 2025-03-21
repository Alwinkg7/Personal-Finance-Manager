# Personal Finance Manager (FinBridge)

## Description
Personal Finance Manager (FinBridge) is a web application designed to help users manage their finances effectively. It allows users to track their income and expenses, set budgets, participate in savings challenges, and receive personalized financial advice powered by Machine Learning (ML).

## Features
- Track income and expenses
- Set and manage budgets
- Participate in savings challenges
- Receive personalized financial advice using ML
- Visualize spending and earnings with charts

---

## Installation
To run this project locally, follow these steps:

### 1. Clone the Repository
```
git clone https://github.com/your-username/Personal-Finance-Manager.git
cd Personal-Finance-Manager
```
### 2. Set Up the Frontend
Navigate to the frontend directory:

```
cd frontend
```
Install dependencies:

```
npm install
```
Start the frontend server:

```
npm start
```
### 3. Set Up the Backend (Node.js)
Navigate to the backend directory:

```
cd ../backend
```
Install dependencies:

```
npm install
```
Start the backend server:

```
npm start
```
### 4. Set Up the Django ML Service
Navigate to the ml_service directory:

```
cd ../ml_service
```
Create a virtual environment and activate it:

```
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```
Install dependencies:

```
pip install -r requirements.txt
```
Run the Django server:

```
python manage.py runserver
```
Usage
### Open your web browser and navigate to http://localhost:3000.

### Register a new account or log in with your existing credentials.

### Start managing your finances by adding transactions, setting budgets, and participating in savings challenges.

### Receive personalized financial advice powered by ML.

### Implementation Details

### 1. Django ML Service
The Django ML service analyzes user transactions and provides personalized financial advice. It uses clustering algorithms (e.g., K-Means) to identify spending patterns and generate insights.

### Key Files:
```ml_service/financial_advice/views.py: # Handles the /analyze/ endpoint.```

```ml_service/financial_advice/models.py: # Defines the data models (if needed).```

```ml_service/financial_advice/urls.py: # Defines the API routes.```

### Example: views.py

```
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import pandas as pd
from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler
import json
@csrf_exempt
def analyze_spending(request):
    if request.method == "POST":
        try:
            # Parse transaction data
            data = json.loads(request.body)
            transactions = data.get("transactions", [])

            # Check if transactions are provided
            if not transactions:
                return JsonResponse({"error": "No transactions provided"}, status=400)

            # Convert transactions to a DataFrame
            df = pd.DataFrame(transactions)

            # Ensure required fields are present
            if "amount" not in df.columns or "category" not in df.columns:
                return JsonResponse({"error": "Missing required fields (amount or category)"}, status=400)

            # Preprocess data
            df["amount"] = df["amount"].astype(float)
            df["category"] = df["category"].astype("category").cat.codes  # Encode categories

            # Normalize data
            scaler = StandardScaler()
            scaled_data = scaler.fit_transform(df[["amount", "category"]])

            # Cluster transactions
            kmeans = KMeans(n_clusters=2, random_state=42)
            df["cluster"] = kmeans.fit_predict(scaled_data)

            # Analyze clusters
            cluster_summary = df.groupby("cluster")["amount"].sum().to_dict()
            return JsonResponse(cluster_summary)

        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse({"error": "Invalid request method"}, status=400)
```
### 2. Backend (Node.js)
The backend communicates with the Django ML service to fetch financial advice and serves it to the frontend.

### Key Files:
```backend/controllers/financialAdviceController.js: #Handles the /api/financial-advice endpoint.```

```backend/routes/financialAdviceRoutes.js: # Defines the API routes.```

### Example: financialAdviceController.js

```
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
```
### 3. Frontend (React)
The frontend displays financial advice and interacts with the backend to fetch data.

### Key Files:
```
frontend/src/components/FinancialAdvice.jsx: # Displays financial advice.
```
```
frontend/src/App.js: # Main application component.
```
### Example: FinancialAdvice.jsx

```
import React, { useEffect, useState } from "react";
import { Box, Heading, Text, List, ListItem, ListIcon } from "@chakra-ui/react";
import { MdCheckCircle } from "react-icons/md";
import axios from "axios";

const FinancialAdvice = ({ transactions }) => {
  const [financialAdvice, setFinancialAdvice] = useState([]);

  // Fetch AI-generated advice
  useEffect(() => {
    const fetchAdvice = async () => {
      try {
        const response = await axios.post("/api/financial-advice", {
          transactions,
        });
        setFinancialAdvice(response.data.advice);
      } catch (error) {
        console.error("Failed to fetch AI-generated advice:", error);
      }
    };

    fetchAdvice();
  }, [transactions]);

  return (
    <Box bg="white" p={6} borderRadius="lg" boxShadow="md" width={{ base: "100%", md: "50%" }}>
      <Heading as="h2" fontSize={{ base: "lg", md: "xl" }} mb={4} color="teal.500">
        Financial Advice (AI-Powered)
      </Heading>
      <Text fontSize="md" color="gray.700" mb={6}>
        Here are some personalized tips to help you manage your finances better:
      </Text>

      <List spacing={3}>
        {financialAdvice.map((advice, index) => (
          <ListItem key={index}>
            <ListIcon as={MdCheckCircle} color="teal.500" />
            {advice}
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default FinancialAdvice;
```
### Contributing
### Contributions are welcome! Please follow these steps to contribute:

### Fork the repository.

Create a new branch: ```git checkout -b feature/your-feature-name```

Make your changes and commit them: ```git commit -m 'Add some feature'```

Push to the branch: ```git push origin feature/your-feature-name```

Open a pull request.

### License
This project is licensed under the MIT License. See the LICENSE file for details.

### Contact
If you have any questions or suggestions, feel free to contact me at [alwinkgofficial@gmail.com].
```bash
