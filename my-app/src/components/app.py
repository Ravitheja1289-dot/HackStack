from flask import Flask, request, jsonify
from transformers import AutoModelForCausalLM, AutoTokenizer
import torch
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend communication

# Load LLaMA model
MODEL_NAME = "meta-llama/Llama-2-7b-chat-hf"  # Ensure you have access to this model

try:
    tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME)
    
    model = AutoModelForCausalLM.from_pretrained(
        MODEL_NAME,
        torch_dtype=torch.float16,  # Use float16 for lower VRAM usage
        device_map="auto"  # Automatically map model to available GPU
    )

except Exception as e:
    print(f"Error loading model: {e}")
    model, tokenizer = None, None  # Prevent crashes if model fails to load

@app.route("/chat", methods=["POST"])
def chat():
    if model is None or tokenizer is None:
        return jsonify({"response": "❌ Model failed to load. Check server logs."}), 500

    try:
        user_input = request.json.get("message", "").strip()
        if not user_input:
            return jsonify({"response": "⚠️ Please enter a valid message!"}), 400

        # Tokenize user input
        inputs = tokenizer(user_input, return_tensors="pt", padding=True).to("cuda")

        # Generate response with sampling
        output = model.generate(
            **inputs,
            max_length=200,
            temperature=0.7,  # Adjust for more randomness
            top_k=50,
            top_p=0.9,
            do_sample=True  # Enable sampling
        )

        bot_response = tokenizer.decode(output[0], skip_special_tokens=True)

        return jsonify({"response": bot_response})

    except Exception as e:
        return jsonify({"response": f"⚠️ Error: {str(e)}"}), 500

if __name__ == "__main__":
    app.run(debug=True)
