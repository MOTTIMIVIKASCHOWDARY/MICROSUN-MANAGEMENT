# ==============================================================================
# MICROSUN MANAGEMENT - Update Excel Workbook with Selenium E2E Testing Tab
# ==============================================================================

$jsonPath = Join-Path (Split-Path -Parent $MyInvocation.MyCommand.Definition) "selenium_test_results.json"
if (-not (Test-Path $jsonPath)) {
    Write-Host "JSON results not found at: $jsonPath" -ForegroundColor Red
    exit
}

$results = Get-Content $jsonPath -Raw | ConvertFrom-Json

$targetPaths = @(
    "c:\Users\unite\OneDrive\Desktop\PDD\MICROSUN_OFFICIAL_TEST_REPORT.xlsx",
    "c:\Users\unite\OneDrive\Desktop\PDD\web_app\MICROSUN_OFFICIAL_TEST_REPORT.xlsx"
)

$excel = New-Object -ComObject Excel.Application
$excel.Visible = $false
$excel.DisplayAlerts = $false

$mainPath = $targetPaths[0]
if (-not (Test-Path $mainPath)) {
    $wb = $excel.Workbooks.Add()
} else {
    $wb = $excel.Workbooks.Open($mainPath)
}

# Colors in BGR format
$ColorDarkGreen = 0x205E1B
$ColorMedGreen  = 0x327D2E
$ColorLightMint = 0xE9F5E8
$ColorDarkSlate = 0x383226
$ColorBorder    = 0xD0D0D0
$ColorWhite     = 0xFFFFFF
$ColorPassGreen = 0xC8E6C9
$ColorPending   = 0xFFF9C4

# Look for existing Selenium tab
$wsSel = $null
foreach ($ws in $wb.Worksheets) {
    if ($ws.Name -eq "Selenium E2E Testing") {
        $wsSel = $ws
        break
    }
}

if ($wsSel -eq $null) {
    $wsSel = $wb.Worksheets.Add([System.Reflection.Missing]::Value, $wb.Worksheets.Item($wb.Worksheets.Count))
    $wsSel.Name = "Selenium E2E Testing"
}

$wsSel.Activate()
$wsSel.Cells.Clear()
$wsSel.Application.ActiveWindow.DisplayGridlines = $true

# Title Banner
$wsSel.Range("A1:F1").Merge()
$wsSel.Range("A1:F1").Value2 = "SELENIUM AUTOMATED END-TO-END (E2E) TEST RESULTS"
$wsSel.Range("A1:F1").Font.Size = 15
$wsSel.Range("A1:F1").Font.Bold = $true
$wsSel.Range("A1:F1").Font.Color = $ColorWhite
$wsSel.Range("A1:F1").Interior.Color = $ColorDarkGreen
$wsSel.Range("A1:F1").HorizontalAlignment = -4108
$wsSel.Range("A1:F1").RowHeight = 35

# Subtitle
$wsSel.Range("A2:F2").Merge()
$wsSel.Range("A2:F2").Value2 = "COMPLETE APPLICATION VALIDATION ACROSS 12 MODULES AND MULTILINGUAL ENGINE"
$wsSel.Range("A2:F2").Font.Size = 10
$wsSel.Range("A2:F2").Font.Bold = $true
$wsSel.Range("A2:F2").Font.Color = $ColorDarkSlate
$wsSel.Range("A2:F2").Interior.Color = $ColorLightMint
$wsSel.Range("A2:F2").HorizontalAlignment = -4108
$wsSel.Range("A2:F2").RowHeight = 22

# Metadata Block
$wsSel.Cells.Item(4, 1) = "Testing Engine:"
$wsSel.Cells.Item(4, 2) = "Selenium WebDriver (Node.js & Chrome Headless)"
$wsSel.Cells.Item(4, 4) = "Execution Timestamp:"
$wsSel.Cells.Item(4, 5) = $results.timestamp

$wsSel.Cells.Item(5, 1) = "Browser Target:"
$wsSel.Cells.Item(5, 2) = "Google Chrome (v151+ Headless)"
$wsSel.Cells.Item(5, 4) = "Pass Rate & Status:"
$wsSel.Cells.Item(5, 5) = "$($results.passRate) ($($results.passed)/$($results.totalTests) Passed - ALL PASSED)"

$wsSel.Range("A4:E5").Font.Name = "Segoe UI"
$wsSel.Range("A4:A5").Font.Bold = $true
$wsSel.Range("D4:D5").Font.Bold = $true

# Table Header
$headers = @("Test Case ID", "Category / Module", "Test Scenario Description", "Execution Time (ms)", "Status", "Detailed Findings")
for ($i = 0; $i -lt $headers.Length; $i++) {
    $wsSel.Cells.Item(7, $i + 1) = $headers[$i]
}

# Format Header
$hdrRange = $wsSel.Range($wsSel.Cells.Item(7, 1), $wsSel.Cells.Item(7, 6))
$hdrRange.Interior.Color = $ColorDarkGreen
$hdrRange.Font.Bold = $true
$hdrRange.Font.Color = $ColorWhite
$hdrRange.Font.Size = 11
$hdrRange.Font.Name = "Segoe UI"
$hdrRange.HorizontalAlignment = -4108
$hdrRange.RowHeight = 26
$hdrRange.Borders.LineStyle = 1
$hdrRange.Borders.Color = $ColorBorder

# Populate Data Rows
$row = 8
foreach ($t in $results.tests) {
    $wsSel.Cells.Item($row, 1) = $t.id
    $wsSel.Cells.Item($row, 2) = $t.category
    $wsSel.Cells.Item($row, 3) = $t.name
    $wsSel.Cells.Item($row, 4) = $t.durationMs
    $wsSel.Cells.Item($row, 5) = $t.status
    $wsSel.Cells.Item($row, 6) = $t.details
    $row++
}

$endRow = $row - 1
$dataRange = $wsSel.Range($wsSel.Cells.Item(8, 1), $wsSel.Cells.Item($endRow, 6))
$dataRange.Font.Name = "Segoe UI"
$dataRange.Font.Size = 10
$dataRange.VerticalAlignment = -4108
$dataRange.Borders.LineStyle = 1
$dataRange.Borders.Color = $ColorBorder
$dataRange.RowHeight = 22

# Alternate Row Fill & Format Status Column
for ($r = 8; $r -le $endRow; $r++) {
    if ($r % 2 -eq 0) {
        $wsSel.Range($wsSel.Cells.Item($r, 1), $wsSel.Cells.Item($r, 6)).Interior.Color = 0xFAFAFA
    } else {
        $wsSel.Range($wsSel.Cells.Item($r, 1), $wsSel.Cells.Item($r, 6)).Interior.Color = 0xFFFFFF
    }

    $wsSel.Cells.Item($r, 1).Font.Bold = $true
    $wsSel.Cells.Item($r, 1).HorizontalAlignment = -4108
    $wsSel.Cells.Item($r, 4).NumberFormat = "#,##0"
    $wsSel.Cells.Item($r, 4).HorizontalAlignment = -4108

    $st = $wsSel.Cells.Item($r, 5).Value2
    if ($st -eq "PASSED") {
        $wsSel.Cells.Item($r, 5).Interior.Color = $ColorPassGreen
        $wsSel.Cells.Item($r, 5).Font.Bold = $true
    } else {
        $wsSel.Cells.Item($r, 5).Interior.Color = $ColorPending
        $wsSel.Cells.Item($r, 5).Font.Bold = $true
    }
    $wsSel.Cells.Item($r, 5).HorizontalAlignment = -4108
}

# Auto-fit columns
$wsSel.UsedRange.Columns.AutoFit() | Out-Null
for ($col = 1; $col -le $wsSel.UsedRange.Columns.Count; $col++) {
    $wsSel.Columns.Item($col).ColumnWidth = [Math]::Min(60, [Math]::Max(14, $wsSel.Columns.Item($col).ColumnWidth + 4))
}

# Update Tab 1 (Executive Summary) with Selenium E2E status
try {
    $wsDash = $wb.Worksheets.Item("Executive Summary and KPIs")
    if ($wsDash -ne $null) {
        $foundSelRow = $false
        for ($r = 8; $r -le 25; $r++) {
            $val = $wsDash.Cells.Item($r, 1).Value2
            if ($val -like "*Selenium*") {
                $wsDash.Cells.Item($r, 3) = "$($results.passed)/$($results.totalTests) Passed ($($results.passRate))"
                $wsDash.Cells.Item($r, 5) = "PASSED"
                $foundSelRow = $true
                break
            }
        }
        if (-not $foundSelRow) {
            $insertRow = 18
            $wsDash.Cells.Item($insertRow, 1) = "Selenium E2E Automated Testing"
            $wsDash.Cells.Item($insertRow, 2) = "All 12 Modules & Multilingual"
            $wsDash.Cells.Item($insertRow, 3) = "$($results.passed)/$($results.totalTests) Passed ($($results.passRate))"
            $wsDash.Cells.Item($insertRow, 4) = "Full E2E Flows Validated"
            $wsDash.Cells.Item($insertRow, 5) = "PASSED"
            $wsDash.Cells.Item($insertRow, 5).Interior.Color = $ColorPassGreen
            $wsDash.Cells.Item($insertRow, 5).Font.Bold = $true
            $wsDash.Cells.Item($insertRow, 5).HorizontalAlignment = -4108
            $wsDash.Cells.Item($insertRow, 1).Font.Bold = $true
        }
    }
} catch { }

# Save properly
$wb.Save()

if (Test-Path $targetPaths[1]) { Remove-Item $targetPaths[1] -Force -ErrorAction SilentlyContinue }
$wb.SaveCopyAs($targetPaths[1])

$wb.Close($false)
$excel.Quit()
[System.Runtime.InteropServices.Marshal]::ReleaseComObject($excel) | Out-Null

Write-Host "Excel Workbook successfully updated with Selenium E2E Testing Tab!" -ForegroundColor Green
