$rootDir = "c:\Users\unite\OneDrive\Desktop\PDD"

# List of root files to KEEP explicitly
$keepFiles = @(
    'README.md',
    '.gitignore',
    'server.ps1'
)

# Move loose root files into their proper target folders before cleaning
$rootFiles = Get-ChildItem -Path $rootDir -File | Where-Object { $keepFiles -notcontains $_.Name }

$removedCount = 0
foreach ($file in $rootFiles) {
    # If it's a web asset (.html, .css, .js, .json, .png, .jpg, .jpeg, .svg), ensure it's in web_app/ first
    if ($file.Extension -in ('.html','.css','.js','.json','.png','.jpg','.jpeg','.svg')) {
        $dest = Join-Path "$rootDir\web_app" $file.Name
        if (-not (Test-Path $dest)) {
            Copy-Item -Path $file.FullName -Destination $dest -Force
            Write-Host "Backed up $($file.Name) to web_app/"
        }
    }
    
    # Remove loose file from root to keep web app and android app completely separate
    Remove-Item -Path $file.FullName -Force
    $removedCount++
    Write-Host "Removed loose file from root: $($file.Name)"
}

Write-Host "Cleaned $removedCount loose files from project root."
