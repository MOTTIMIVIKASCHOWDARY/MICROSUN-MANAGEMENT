$rootDir = "c:\Users\unite\OneDrive\Desktop\PDD"

# 1. Ensure directories exist
New-Item -ItemType Directory -Force -Path "$rootDir\scratch" | Out-Null
New-Item -ItemType Directory -Force -Path "$rootDir\docs" | Out-Null
New-Item -ItemType Directory -Force -Path "$rootDir\Test Results\Summary" | Out-Null
New-Item -ItemType Directory -Force -Path "$rootDir\Test Results\Excel" | Out-Null
New-Item -ItemType Directory -Force -Path "$rootDir\web_app" | Out-Null
New-Item -ItemType Directory -Force -Path "$rootDir\android_app\app\src\main\assets" | Out-Null

# 2. Archive temp text files to scratch
@('extracted_request.txt', 'extracted_request_utf8.txt', 'full_request_27.txt', 'full_request_user.txt') | ForEach-Object {
    $src = Join-Path $rootDir $_
    if (Test-Path $src) {
        Move-Item -Path $src -Destination "$rootDir\scratch\$_" -Force
        Write-Host "Archived $_ to scratch/"
    }
}

# 3. Populate docs/
@('PROJECT_DOCUMENTATION.md', 'LOAD_TEST_REPORT.md', 'SELENIUM_TESTING_REPORT.md') | ForEach-Object {
    $src = Join-Path $rootDir $_
    if (Test-Path $src) {
        Copy-Item -Path $src -Destination "$rootDir\docs\$_" -Force
        Write-Host "Copied $_ to docs/"
    }
}

# 4. Populate Test Results/Summary/ and Test Results/Excel/
if (Test-Path "$rootDir\LOAD_TEST_REPORT.md") {
    Copy-Item -Path "$rootDir\LOAD_TEST_REPORT.md" -Destination "$rootDir\Test Results\Summary\LOAD_TEST_REPORT.md" -Force
    Write-Host "Copied LOAD_TEST_REPORT.md to Test Results/Summary/"
}
if (Test-Path "$rootDir\SELENIUM_TESTING_REPORT.md") {
    Copy-Item -Path "$rootDir\SELENIUM_TESTING_REPORT.md" -Destination "$rootDir\Test Results\Summary\SELENIUM_TESTING_REPORT.md" -Force
    Write-Host "Copied SELENIUM_TESTING_REPORT.md to Test Results/Summary/"
}
if (Test-Path "$rootDir\MICROSUN_OFFICIAL_TEST_REPORT.xlsx") {
    Copy-Item -Path "$rootDir\MICROSUN_OFFICIAL_TEST_REPORT.xlsx" -Destination "$rootDir\Test Results\Excel\MICROSUN_OFFICIAL_TEST_REPORT.xlsx" -Force
    Write-Host "Copied MICROSUN_OFFICIAL_TEST_REPORT.xlsx to Test Results/Excel/"
}

# 5. Synchronize all web files from root to web_app and android_app/app/src/main/assets
$rootFiles = Get-ChildItem -Path $rootDir -File | Where-Object { $_.Extension -in ('.html','.css','.js','.json','.png','.jpg','.jpeg','.svg','.ps1') }

foreach ($file in $rootFiles) {
    Copy-Item -Path $file.FullName -Destination "$rootDir\web_app\$($file.Name)" -Force
    Copy-Item -Path $file.FullName -Destination "$rootDir\android_app\app\src\main\assets\$($file.Name)" -Force
}
Write-Host "Synchronized $($rootFiles.Count) web asset files to web_app/ and android_app/app/src/main/assets/"
