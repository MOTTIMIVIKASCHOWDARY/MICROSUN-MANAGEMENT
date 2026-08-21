$html = Get-Content -Path "pest_watch_guidance.html" -Raw
$matches = [regex]::Matches($html, '<h4>(.*?)</h4>.*?<p class="disease-symptoms">(.*?)</p>.*?<div class="treatment-box pesticide">.*?<p>(.*?)</p>.*?<div class="treatment-box nutrient">.*?<p>(.*?)</p>', [System.Text.RegularExpressions.RegexOptions]::Singleline)
foreach ($m in $matches) {
    Write-Output "----------------------------------------"
    Write-Output "Disease: $($m.Groups[1].Value.Trim())"
    Write-Output "Symptoms: $($m.Groups[2].Value.Trim())"
    Write-Output "Chemical: $($m.Groups[3].Value.Trim())"
    Write-Output "Nutrient: $($m.Groups[4].Value.Trim())"
}
