from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai

app = Flask(__name__)
CORS(app)

# Configure Gemini API Key
genai.configure(api_key="AIzaSyDXFMfYPjHxiXvpkJl_CGMoRS1ZNTr2ywE")

# Load the model
model = genai.GenerativeModel("gemini-1.5-flash")

def format_response(response_text):
    """
    Converts plain text responses into structured, readable formats.
    """
    # Split responses based on new lines or common delimiters
    lines = response_text.split("\n")
    structured_data = {}

    current_category = None
    for line in lines:
        line = line.strip()
        if not line:
            continue
        
        # Check if line looks like a category (e.g., "**Technology:**")
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

    # Generate AI response
    response = model.generate_content(user_input)

    # Format response into structured data
    structured_response = format_response(response.text)

    return jsonify({"response": structured_response})

if __name__ == "__main__":
    app.run(debug=True)
