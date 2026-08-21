$headers = @{
    "User-Agent" = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
    "Accept" = "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8"
}

# Enable TLS 1.2
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12

Write-Host "Downloading Hay Baler image..."
try {
    Invoke-WebRequest -Uri "https://commons.wikimedia.org/wiki/Special:FilePath/Round_baler_3069.jpg" -Headers $headers -OutFile "hay_baler.jpg" -TimeoutSec 15 -MaximumRedirection 5
    Write-Host "Hay Baler image downloaded successfully!"
} catch {
    Write-Host "Failed to download Hay Baler: $_"
}
