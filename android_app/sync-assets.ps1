$rootDir = Split-Path -Parent $PSScriptRoot
if (-not (Test-Path "$rootDir\web_app")) {
    $rootDir = "c:\Users\unite\OneDrive\Desktop\PDD"
}

$srcDir = "$rootDir\web_app"
$bananaWebDir = "$PSScriptRoot\Banana-web"
$androidAssetsDir = "$PSScriptRoot\app\src\main\assets"

$validExts = @('.html', '.css', '.js', '.png', '.jpg', '.jpeg', '.json', '.svg', '.webp', '.ico', '.xlsx', '.md', '.txt')

if (-not (Test-Path $androidAssetsDir)) {
    New-Item -ItemType Directory -Path $androidAssetsDir -Force | Out-Null
}
if (-not (Test-Path $bananaWebDir)) {
    New-Item -ItemType Directory -Path $bananaWebDir -Force | Out-Null
}

Write-Host "Syncing files from $srcDir..."

Get-ChildItem -Path $srcDir -File | Where-Object { $validExts -contains $_.Extension.ToLower() } | ForEach-Object {
    Copy-Item -Path $_.FullName -Destination $androidAssetsDir -Force
    Copy-Item -Path $_.FullName -Destination $bananaWebDir -Force
}

if (Test-Path "$srcDir\disease_images") {
    Copy-Item -Path "$srcDir\disease_images" -Destination $androidAssetsDir -Recurse -Force
    Copy-Item -Path "$srcDir\disease_images" -Destination $bananaWebDir -Recurse -Force
}

Write-Host "✅ All web assets successfully synced from web_app into android_app!"





