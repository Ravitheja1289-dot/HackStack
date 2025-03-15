import google.generativeai as genai

# Set up API key
genai.configure(api_key="AIzaSyATRoCjGuqTmn4KWTaTSGJD14FtvUSdZ8g")

# Initialize the model
model = genai.GenerativeModel("gemini-1.5-flash")

def chat_with_gemini(prompt):
    response = model.generate_content(prompt)
    return response.text

# Example usage
while True:
    user_input = input("You: ")
    if user_input.lower() in ["exit", "quit", "bye"]:
        print("Chatbot: Goodbye!")
        break

    response = chat_with_gemini(user_input)
    print(f"Chatbot: {response}")
