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