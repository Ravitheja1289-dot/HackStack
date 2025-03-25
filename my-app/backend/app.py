from flask import Flask, request, jsonify
import google.generativeai as genai
import os
from dotenv import load_dotenv
app = Flask(__name__)

# Set your Gemini API Key
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
genai.configure(api_key=GEMINI_API_KEY)

@app.route("/chat", methods=["POST"])
def chat():
    try:
        user_input = request.json.get("message")
        model = genai.GenerativeModel("gemini-pro")
        response = model.generate_content(user_input)
        return jsonify({"reply": response.text})
    except Exception as e:
        return jsonify({"reply": "⚠️ Error processing your request."}), 500

if __name__ == "__main__":
    app.run(debug=True)


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
