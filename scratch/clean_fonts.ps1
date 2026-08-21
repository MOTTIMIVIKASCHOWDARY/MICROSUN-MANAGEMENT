$p = 'c:\Users\unite\OneDrive\Desktop\PROJECTS\PDD\pest_watch_guidance.html'
$c = [System.IO.File]::ReadAllText($p)
$c = $c.Replace("font-family: 'Times New Roman', Times, serif !important;", "")
$c = $c.Replace("font-family: 'Times New Roman' !important;", "")
[System.IO.File]::WriteAllText($p, $c)
Write-Output "Cleaned successfully!"
