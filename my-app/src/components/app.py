from flask import Flask, request, jsonify
from flask_cors import CORS
from llama_cpp import Llama  # CPU-based LLaMA
import ollama  # GPU-based LLaMA

app = Flask(__name__)
CORS(app)  # Enable Cross-Origin Requests

# Load LLaMA model (Choose CPU or GPU)
USE_GPU = False  # Change to True for GPU (Ollama)

if USE_GPU:
    model = "llama2"  # Ollama model
else:
    model = Llama(model_path="models/llama-2-7b-chat.Q4_K_M.gguf")  # CPU model

@app.route('/chat', methods=['POST'])
def chat():
    user_message = request.json.get("message", "")

    if USE_GPU:
        response = ollama.chat(model=model, messages=[{"role": "user", "content": user_message}])
        bot_reply = response['message']['content']
    else:
        response = model(f"User: {user_message}\nAI:", max_tokens=100)
        bot_reply = response["choices"][0]["text"]

    return jsonify({"response": bot_reply})

if __name__ == '__main__':
    app.run(debug=True, port=5000)
