import re
from bs4 import BeautifulSoup

with open("pest_watch_guidance.html", "r", encoding="utf-8") as f:
    soup = BeautifulSoup(f.read(), "html.parser")

views = soup.find_all("div", class_="detail-view")

print(f"Total Stages found: {len(views)}")

for v in views:
    stage_title = v.find("h3").get_text(strip=True) if v.find("h3") else "Unknown Stage"
    print(f"\n========================================\nSTAGE: {stage_title}\n========================================")
    
    items = v.find_all("div", class_="disease-item")
    for item in items:
        name = item.find("h4").get_text(strip=True) if item.find("h4") else "Unknown Disease"
        symptoms = item.find("p", class_="disease-symptoms").get_text(strip=True) if item.find("p", class_="disease-symptoms") else ""
        
        pest_box = item.find("div", class_="treatment-box pesticide")
        pest_text = pest_box.find("p").get_text(strip=True) if (pest_box and pest_box.find("p")) else "None"
        
        nutr_box = item.find("div", class_="treatment-box nutrient")
        nutr_text = nutr_box.find("p").get_text(strip=True) if (nutr_box and nutr_box.find("p")) else "None"
        
        print(f"\nDisease: {name}")
        print(f"  Symptoms: {symptoms}")
        print(f"  Chemical: {pest_text}")
        print(f"  Nutrient: {nutr_text}")
