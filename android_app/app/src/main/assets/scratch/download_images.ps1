$headers = @{
    "User-Agent" = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
    "Accept" = "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8"
}

# Enable TLS 1.2
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12

Write-Host "Downloading Seed Drill image..."
try {
    Invoke-WebRequest -Uri "https://commons.wikimedia.org/wiki/Special:FilePath/Disc_Harrow_Seed_Drill.jpg" -Headers $headers -OutFile "seed_drill.jpg" -TimeoutSec 15 -MaximumRedirection 5
    Write-Host "Seed Drill image downloaded successfully!"
} catch {
    Write-Host "Failed to download Seed Drill: $_"
}

Write-Host "Downloading Rice Transplanter image..."
try {
    Invoke-WebRequest -Uri "https://commons.wikimedia.org/wiki/Special:FilePath/Rice_transplanter.JPG" -Headers $headers -OutFile "rice_transplanter.jpg" -TimeoutSec 15 -MaximumRedirection 5
    Write-Host "Rice Transplanter image downloaded successfully!"
} catch {
    Write-Host "Failed to download Rice Transplanter: $_"
}
