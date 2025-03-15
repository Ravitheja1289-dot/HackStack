import google.generativeai as genai

genai.configure(api_key="AIzaSyBqdihS66l5D-1IIYj8Hy-05g8Q37NpZ1g")


model = genai.GenerativeModel("gemini-1.5-flash") 

response = model.generate_content("Explain the 2nd World War?")

print(response.text)
