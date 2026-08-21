$webFiles = Get-ChildItem -Path "c:\Users\unite\OneDrive\Desktop\PDD" -File | Where-Object { $_.Extension -match '^\.(html|css|js|png|jpg|jpeg|json|svg|webp|ico|ps1|md|txt)$' }

$targetDirs = @(
    "c:\Users\unite\OneDrive\Desktop\PDD\web_app",
    "c:\Users\unite\OneDrive\Desktop\PDD\android_app\app\src\main\assets"
)

foreach ($target in $targetDirs) {
    if (-not (Test-Path $target)) {
        New-Item -ItemType Directory -Path $target -Force | Out-Null
    }
    foreach ($file in $webFiles) {
        Copy-Item -Path $file.FullName -Destination $target -Force
    }
    if (Test-Path "c:\Users\unite\OneDrive\Desktop\PDD\disease_images") {
        Copy-Item -Path "c:\Users\unite\OneDrive\Desktop\PDD\disease_images" -Destination $target -Recurse -Force
    }
}
Write-Host "Synchronization complete across root, web_app, and android_app assets!"
