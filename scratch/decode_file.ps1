$sourcePath = "c:\Users\unite\OneDrive\Desktop\PROJECTS\PDD\renting_translations.js"
$destPath = "c:\Users\unite\OneDrive\Desktop\PROJECTS\PDD\renting_translations_fixed.js"

# Read the file as UTF-8 string
$content = [System.IO.File]::ReadAllText($sourcePath, [System.Text.Encoding]::UTF8)

# Convert string to CP1252 bytes
# First register CodePages if needed
[System.Text.Encoding]::RegisterProvider([System.Text.CodePagesEncodingProvider]::Instance)
$cp1252 = [System.Text.Encoding]::GetEncoding(1252)
$bytes = $cp1252.GetBytes($content)

# Decode bytes as UTF-8
$fixedContent = [System.Text.Encoding]::UTF8.GetString($bytes)

# Write back to file
[System.IO.File]::WriteAllText($destPath, $fixedContent, [System.Text.Encoding]::UTF8)
Write-Output "Successfully decoded translations to $destPath"
