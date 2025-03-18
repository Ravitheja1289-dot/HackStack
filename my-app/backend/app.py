from flask import Flask, request, jsonify
from flask_cors import CORS
from transformers import pipeline

app = Flask(__name__)
CORS(app, resources={r"/chat": {"origins": "*"}})

# Load a financial chatbot model from Hugging Face
finance_chatbot = pipeline("text-generation", model="kanwu/ChatFinance")

def format_response(response_text):
    """
    Converts AI response into a structured format.
    """
    lines = response_text.split("\n")
    structured_data = {}

    current_category = None
    for line in lines:
        line = line.strip()
        if not line:
            continue

        if line.startswith("**") and line.endswith("**:"):
            current_category = line.replace("**", "").replace(":", "").strip()
            structured_data[current_category] = []
        elif current_category:
            structured_data[current_category].append(line)
        else:
            structured_data.setdefault("General", []).append(line)

    return structured_data

@app.route("/chat", methods=["POST"])
def chat():
    data = request.get_json()
    user_input = data.get("message", "")

    if not user_input:
        return jsonify({"error": "Message is required"}), 400

    try:
        # Generate AI response using a finance-specific model
        response = finance_chatbot(user_input, max_length=200, num_return_sequences=1)
        
        # Extract the response text
        response_text = response[0]["generated_text"]

        # Format and return the response
        structured_response = format_response(response_text)
        return jsonify({"response": structured_response})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
    