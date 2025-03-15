from google import genai

client = genai.Client(api_key="AIzaSyDyFUmT8OtZdJDHzc0R1Ro-pBdJrSjIkDc")
response = client.models.generate_content(
    model="gemini-2.0-flash", contents="Explain the 2nd world war?"
)
print(response.text)