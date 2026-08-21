$path = "c:\Users\unite\OneDrive\Desktop\PROJECTS\PDD\renting_translations.js"
$content = [System.IO.File]::ReadAllText($path, [System.Text.Encoding]::UTF8)

# Characters representing UTF-8 bytes of ₹ interpreted as CP1252:
# U+00E2 (226), U+201A (8218), U+00B9 (185)
$badString = [char]226 + [char]8218 + [char]185
$content = $content.Replace($badString, "₹")

[System.IO.File]::WriteAllText($path, $content, [System.Text.Encoding]::UTF8)
Write-Output "Rupee symbol corrected with char codes."
