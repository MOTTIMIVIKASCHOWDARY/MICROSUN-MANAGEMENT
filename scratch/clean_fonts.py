import re

file_path = r"c:\Users\unite\OneDrive\Desktop\PROJECTS\PDD\pest_watch_guidance.html"

with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# Replace Times New Roman font-family overrides
cleaned = re.sub(r"font-family:\s*'Times New Roman',\s*Times,\s*serif\s*!important;?", "", content)
cleaned = re.sub(r"font-family:\s*'Times New Roman'\s*!important;?", "", cleaned)

with open(file_path, "w", encoding="utf-8") as f:
    f.write(cleaned)

print("Fonts cleaned successfully!")
