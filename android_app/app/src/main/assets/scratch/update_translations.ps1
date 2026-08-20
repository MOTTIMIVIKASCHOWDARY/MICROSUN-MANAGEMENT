$filePath = "renting_translations.js"

# Read all lines of the file using UTF-8 encoding
$lines = [System.IO.File]::ReadAllLines($filePath, [System.Text.Encoding]::UTF8)
$list = New-Object System.Collections.Generic.List[string]($lines)

# Insert new translations bottom-up
# 13. pa (after 962)
$list.Insert(962, '    "equip_baler": "ਉੱਚ ਸਮਰੱਥਾ ਵਾਲਾ ਗੋਲ ਘਾਹ ਬੇਲਰ",')

# 12. ml (after 918)
$list.Insert(918, '    "equip_baler": "ഉയർന്ന ശേഷിയുള്ള റൗണ്ട് വൈക്കോൽ ബെയ്ലർ",')

# 11. or (after 874)
$list.Insert(874, '    "equip_baler": "ଉଚ୍ଚ କ୍ଷମତା ସମ୍ପନ୍ନ ଗୋଲାକାର ନଡ଼ା ବେଲਰ",')

# 10. kn (after 830)
$list.Insert(830, '    "equip_baler": "ಹೆಚ್ಚಿನ ಸಾಮರ್ಥ್ಯದ ದುಂಡಗಿನ ಹುಲ್ಲು ಬೇಲರ್",')

# 9. ur (after 786)
$list.Insert(786, '    "equip_baler": "اعلیٰ صلاحیت والا گول گھاس بیلر",')

# 8. gu (after 742)
$list.Insert(742, '    "equip_baler": "ઉચ્ચ ક્ષમતાવાળા ગોળ ઘાસ બેલર",')

# 7. te (after 698)
$list.Insert(698, '    "equip_baler": "అధిక సామర్థ్యం గల గుండ్రటి గడ్డి బేలర్",')

# 6. mr (after 654)
$list.Insert(654, '    "equip_baler": "उच्च-क्षमता गोल पेंढा बेलर",')

# 5. bn (after 610)
$list.Insert(610, '    "equip_baler": "উচ্চ ক্ষমতাসম্পন্ন গোল খড় বেলার",')

# 4. es (after 566)
$list.Insert(566, '    "equip_baler": "Empacadora de Heno Redonda de Alta Capacidad",')

# 3. ta (after 522)
$list.Insert(522, '    "equip_baler": "உயர் திறன் கொண்ட வட்ட வைக்கோல் கட்டும் இயந்திரம்",')

# 2. hi (after 478)
$list.Insert(478, '    "equip_baler": "उच्च-क्षमता राउंड हे बेलर",')

# 1. en (after 434)
$list.Insert(434, '    "equip_baler": "High-Capacity Round Hay Baler",')

# Write all lines back using UTF-8 encoding (without BOM to match standard web formats)
$utf8NoBom = New-Object System.Text.UTF8Encoding($false)
[System.IO.File]::WriteAllLines($filePath, $list.ToArray(), $utf8NoBom)

Write-Host "Translations updated successfully in renting_translations.js!"
