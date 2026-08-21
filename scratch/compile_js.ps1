$basePath = "c:\Users\unite\OneDrive\Desktop\PROJECTS\PDD\scratch\base_translations.js"
$jsonPath = "c:\Users\unite\OneDrive\Desktop\PROJECTS\PDD\scratch\new_translations.json"
$destPath = "c:\Users\unite\OneDrive\Desktop\PROJECTS\PDD\renting_translations.js"

# Read base translations
$baseJs = [System.IO.File]::ReadAllText($basePath, [System.Text.Encoding]::UTF8)

# Read new translations JSON
$jsonText = [System.IO.File]::ReadAllText($jsonPath, [System.Text.Encoding]::UTF8)

# Construct final JavaScript
$finalJs = $baseJs + "`n`nconst extraTranslations = " + $jsonText + ";`n`n" + @"
for (const lang in extraTranslations) {
  if (rentingTranslations[lang]) {
    Object.assign(rentingTranslations[lang], extraTranslations[lang]);
  }
}

for (const lang in rentingTranslations) {
  if (window.translations && window.translations[lang]) {
    Object.assign(window.translations[lang], rentingTranslations[lang]);
  }
}
"@

# Save final JS file as UTF-8
[System.IO.File]::WriteAllText($destPath, $finalJs, [System.Text.Encoding]::UTF8)
Write-Output "Successfully compiled and saved renting_translations.js"
