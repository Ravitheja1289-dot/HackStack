from flask import Flask, request, jsonify
import google.generativeai as genai
import os
from dotenv import load_dotenv

# Load environment variables from the correct .env file
ENV_PATH = os.path.join(os.path.dirname(__file__), "VITE_GOOGLE_CLIENT_ID", ".env")
load_dotenv(ENV_PATH)

app = Flask(__name__)

# Get API Key
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

if not GEMINI_API_KEY:
    raise ValueError("⚠️ GEMINI_API_KEY is not set! Check your .env file.")

# Configure Gemini API
genai.configure(api_key=GEMINI_API_KEY)

@app.route("/chat", methods=["POST"])
def chat():
    try:
        user_input = request.json.get("message")
        model = genai.GenerativeModel("gemini-pro")
        response = model.generate_content(user_input)
        return jsonify({"reply": response.text})
    except Exception as e:
        return jsonify({"reply": f"⚠️ Error: {str(e)}"}), 500

if __name__ == "__main__":
    app.run(debug=True)
