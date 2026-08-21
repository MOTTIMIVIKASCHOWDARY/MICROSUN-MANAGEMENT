$path = "c:\Users\unite\OneDrive\Desktop\PROJECTS\PDD\renting_translations.js"
$lines = Get-Content -Path $path -Encoding UTF8
foreach ($line in $lines) {
    if ($line -like "*lblRate*") {
        Write-Output "Found line: $line"
        for ($i = 0; $i -lt $line.Length; $i++) {
            $char = $line[$i]
            $code = [int]$char
            Write-Output "$i : $char (Code: $code)"
        }
    }
}
