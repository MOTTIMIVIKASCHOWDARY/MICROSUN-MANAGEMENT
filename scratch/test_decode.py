import os

text = "à¤‰à¤šà¤¿à¤¤ à¤®à¥‚à¤²à¥ à¤¯"
try:
    decoded = text.encode('cp1252').decode('utf-8')
    print("Decoded successfully:", decoded)
except Exception as e:
    print("Error:", e)
