$filePath = "c:\Users\unite\OneDrive\Desktop\PROJECTS\PDD\renting_translations.js"
$content = [System.IO.File]::ReadAllText($filePath)

$pattern = "(?s)const extraTranslations = \{.+?\};"
$replacement = @"
const extraTranslations = {
  en: {
    reasonablePriceLabel: "Reasonable Price",
    bookNowBtn: "Book Now",
    hireNowBtn: "Hire Now",
    equip_harvester: "Combined Harvester",
    equip_leveler: "Laser Land Leveler",
    equip_plough: "Disc Harrow Plough",
    equip_pump: "AI Smart Irrigation Pump",
    equip_cutter: "Chaff Cutter Machine"
  },
  hi: {
    reasonablePriceLabel: "उचित मूल्य",
    bookNowBtn: "अभी बुक करें",
    hireNowBtn: "अभी नियुक्त करें",
    equip_harvester: "कंबाइन हार्वेस्टर",
    equip_leveler: "लेजर लैंड लेवलर",
    equip_plough: "डिस्क हैरो हल",
    equip_pump: "एआई स्मार्ट सिंचाई पंप",
    equip_cutter: "कुट्टी काटने की मशीन"
  },
  ta: {
    reasonablePriceLabel: "நியாயமான விலை",
    bookNowBtn: "இப்போது முன்பதிவு செய்",
    hireNowBtn: "இப்போது நியமிக்கவும்",
    equip_harvester: "கூட்டு அறுவடை இயந்திரம்",
    equip_leveler: "லேசர் நில சமன் செய்பவர்",
    equip_plough: "வட்டு உழுவி இயந்திரம்",
    equip_pump: "AI ஸ்மார்ட் பாசன பம்ப்",
    equip_cutter: "வைக்கோல் வெட்டும் இயந்திரம்"
  },
  es: {
    reasonablePriceLabel: "Precio Razonable",
    bookNowBtn: "Reservar Ahora",
    hireNowBtn: "Contratar Ahora",
    equip_harvester: "Cosechadora Combinada",
    equip_leveler: "Niveladora Láser de Tierra",
    equip_plough: "Arado de Discos",
    equip_pump: "Bomba de Riego Inteligente AI",
    equip_cutter: "Cortadora de Paja"
  },
  bn: {
    reasonablePriceLabel: "ন্যায্য মূল্য",
    bookNowBtn: "এখনই বুক করুন",
    hireNowBtn: "এখনই নিয়োগ করুন",
    equip_harvester: "কম্বাইন হারভেস্টার",
    equip_leveler: "লেজার ল্যান্ড লেভেলার",
    equip_plough: "ডিস্ক হ্যারো লাঙল",
    equip_pump: "এআই স্মার্ট সেচ পাম্প",
    equip_cutter: "খড় কাটার মেশিন"
  },
  mr: {
    reasonablePriceLabel: "वाजवी दर",
    bookNowBtn: "आता बुक करा",
    hireNowBtn: "आता नियुक्त करा",
    equip_harvester: "कंबाइन हार्वेस्टर",
    equip_leveler: "लेझर लँड लेव्हलर",
    equip_plough: "डिस्क हॅरो नांगर",
    equip_pump: "एआय स्मार्ट सिंचन पंप",
    equip_cutter: "कुट्टी कापणी यंत्र"
  },
  te: {
    reasonablePriceLabel: "సరసమైన ధర",
    bookNowBtn: "ఇప్పుడే బుక్ చేయండి",
    hireNowBtn: "ఇప్పుడే నియమించుకోండి",
    equip_harvester: "కంబైన్డ్ హార్వెస్టర్",
    equip_leveler: "లేజర్ ల్యాండ్ లెవెలర్",
    equip_plough: "డిస్క్ హారో నాగలి",
    equip_pump: "AI స్మార్ట్ ఇరిగేషన్ పంప్",
    equip_cutter: "చాఫ్ కట్టర్ మిషన్"
  },
  gu: {
    reasonablePriceLabel: "વ્યાજબી કિંમત",
    bookNowBtn: "હમણાં બુક કરો",
    hireNowBtn: "હમણાં હાયર કરો",
    equip_harvester: "કમ્બાઈન હાર્વેસ્ટર",
    equip_leveler: "લેસર લેન્ડ લેવલર",
    equip_plough: "ડિસ્ક હેરો હળ",
    equip_pump: "AI સ્માર્ટ સિંચાઇ પંપ",
    equip_cutter: "ચારો કાપવાનું મશીન"
  },
  ur: {
    reasonablePriceLabel: "مناسب قیمت",
    bookNowBtn: "ابھی بک کریں",
    hireNowBtn: "ابھی کام پر لگائیں",
    equip_harvester: "کمبائنڈ ہارویسٹر",
    equip_leveler: "لیزر لینڈ لیولر",
    equip_plough: "ڈسک ہیرو ہل",
    equip_pump: "اے آئی سمارٹ آبپاشی پمپ",
    equip_cutter: "چاف کٹر مشین"
  },
  kn: {
    reasonablePriceLabel: "ಸಮಂಜಸವಾದ ಬೆಲೆ",
    bookNowBtn: "ಈಗಲೇ ಬುಕ್ ಮಾಡಿ",
    hireNowBtn: "ಈಗಲೇ ನೇಮಿಸಿ",
    equip_harvester: "ಕಂಬೈನ್ಡ್ ಹಾರ್ವೆಸ್ಟರ್",
    equip_leveler: "ಲೇಸರ್ ಲ್ಯಾಂಡ್ ಲೆವೆಲರ್",
    equip_plough: "ಡಿಸ್ಕ್ ಹ್ಯಾರೋ ನೇಗಿಲು",
    equip_pump: "AI ಸ್ಮಾರ್ಟ್ ನೀರാവರಿ ಪಂಪ್",
    equip_cutter: "ಚಾഫ് ಕಟರ್ ಯಂತ್ರ"
  },
  or: {
    reasonablePriceLabel: "ଯୁକ୍ତିଯୁକ୍ତ ମୂଲ୍ୟ",
    bookNowBtn: "ବର୍ତ୍տମାନ ବୁକ୍ କରନ୍ତୁ",
    hireNowBtn: "ବର୍ତ୍തମାନ ନିଯୁକ୍ତ କରନ୍ତୁ",
    equip_harvester: "କମ୍ବାଇନ୍ ହାର୍ଭେଷ୍ଟର",
    equip_leveler: "ଲେଜର ଲ୍ୟାଣ୍ଡ ଲେଭେଲର",
    equip_plough: "ଡିସ୍କ ହାରୋ ଲଙ୍ଗଳ",
    equip_pump: "AI ସ୍ମାର୍ଟ ଜଳସେଚନ ପମ୍ପ",
    equip_cutter: "କୁଟା କାଟିବା ମେସିନ"
  },
  ml: {
    reasonablePriceLabel: "ന്യായമായ വില",
    bookNowBtn: "ഇപ്പോൾ ബുക്ക് ചെയ്യുക",
    hireNowBtn: "ഇപ്പോൾ നിയമിക്കുക",
    equip_harvester: "കംബൈൻഡ് ഹാർവെസ്റ്റർ",
    equip_leveler: "ലേസർ ലാൻഡ് ലെവലർ",
    equip_plough: "ഡിസ്ക് ഹാരോ പൂട്ടൽ",
    equip_pump: "AI സ്മാർട്ട് ജലസേചന പമ്പ്",
    equip_cutter: "ചാഫ് കട്ടർ മെഷീൻ"
  },
  pa: {
    reasonablePriceLabel: "ਵਾਜਬ ਕੀਮਤ",
    bookNowBtn: "ਹੁਣੇ ਬੁੱਕ ਕਰੋ",
    hireNowBtn: "ਹੁਣੇ ਹਾਇਰ ਕਰੋ",
    equip_harvester: "ਕੰਬਾਈਨ ਹਾਰਵੈਸਟਰ",
    equip_leveler: "ਲੇਜ਼ਰ ਲੈਂਡ ਲੈਵਲਰ",
    equip_plough: "ਡਿਸਕ ਹੈਰੋ ਹਲ",
    equip_pump: "AI ਸਮਾਰਟ ਸਿੰਚਾਈ ਪੰਪ",
    equip_cutter: "ਚਾਰਾ ਕੱਟਣ ਵਾਲੀ ਮਸ਼ੀਨ"
  }
};
"@

$newContent = $content -replace $pattern, $replacement
[System.IO.File]::WriteAllText($filePath, $newContent)
Write-Output "Done"
