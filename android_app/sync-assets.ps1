$validExts = @('.html', '.css', '.js', '.png', '.jpg', '.jpeg', '.json', '.svg', '.webp', '.ico')
$srcDir = "d:\web_app\Banana-web"
$bananaAssetsDir = "d:\web_app\Banana-android\app\src\main\assets"

if (-not (Test-Path $bananaAssetsDir)) {
    New-Item -ItemType Directory -Path $bananaAssetsDir -Force | Out-Null
}

Get-ChildItem -Path $srcDir -File | Where-Object { $validExts -contains $_.Extension.ToLower() } | ForEach-Object {
    Copy-Item -Path $_.FullName -Destination $bananaAssetsDir -Force
}

if (Test-Path "$srcDir\disease_images") {
    Copy-Item -Path "$srcDir\disease_images" -Destination $bananaAssetsDir -Recurse -Force
}

Write-Host "✅ All web assets successfully synced from Banana-web into Banana-android!"




