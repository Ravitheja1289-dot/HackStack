import google.generativeai as genai

genai.configure(api_key="AIzaSyDyFUmT8OtZdJDHzc0R1Ro-pBdJrSjIkDc")

models = genai.list_models()
for model in models:
    print(model.name)
