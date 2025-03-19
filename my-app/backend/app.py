from flask import Flask, request, jsonify
from flask_cors import CORS
from transformers import AutoTokenizer, AutoModelForSequenceClassification, pipeline

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend requests

# Load FinBERT model
model_name = "ProsusAI/finbert"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForSequenceClassification.from_pretrained(model_name)
nlp_pipeline = pipeline("sentiment-analysis", model=model, tokenizer=tokenizer)

@app.route("/chat", methods=["POST"])
def chat():
    """Handle financial sentiment analysis."""
    data = request.get_json()
    user_message = data.get("message", "")

    if not user_message:
        return jsonify({"error": "Message is required"}), 400

    try:
        result = nlp_pipeline(user_message)[0]
        response = {
            "label": result["label"],
            "confidence": round(result["score"], 4)
        }
        return jsonify({"response": response})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/login", methods=["POST"])
def login():
    """Dummy authentication for now."""
    data = request.get_json()
    token = data.get("token")

    if not token:
        return jsonify({"error": "Token is required"}), 400

    return jsonify({"message": "Login successful", "token": token})

if __name__ == "__main__":
    app.run(debug=True)
