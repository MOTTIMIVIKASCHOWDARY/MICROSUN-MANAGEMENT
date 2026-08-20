# ==============================================================================
# MICROSUN MANAGEMENT - Build All Security & QA Excel Spreadsheets from JSON
# ==============================================================================

$jsonPath = Join-Path (Split-Path -Parent $MyInvocation.MyCommand.Definition) "all_security_data.json"
if (-not (Test-Path $jsonPath)) {
    Write-Host "JSON data file missing: $jsonPath" -ForegroundColor Red
    exit
}

$data = Get-Content $jsonPath -Raw | ConvertFrom-Json
$outDir = "c:\Users\unite\OneDrive\Desktop\PDD\Vulnerability Test Results"
if (-not (Test-Path $outDir)) { New-Item -ItemType Directory -Path $outDir -Force | Out-Null }

Write-Host "Initializing Microsoft Excel COM Engine..." -ForegroundColor Cyan

$excel = New-Object -ComObject Excel.Application
$excel.Visible = $false
$excel.DisplayAlerts = $false

# Colors in BGR format
$ColorDarkGreen = 0x205E1B   # 1B5E20
$ColorMedGreen  = 0x327D2E   # 2E7D32
$ColorLightMint = 0xE9F5E8   # E8F5E9
$ColorDarkSlate = 0x383226   # 263238
$ColorBorder    = 0xD0D0D0
$ColorWhite     = 0xFFFFFF
$ColorPassGreen = 0xC8E6C9   # Soft green
$ColorHighRed   = 0xC6C6FF   # Soft red
$ColorMedYellow = 0xC4F9FF   # Soft yellow
$ColorLowBlue   = 0xFFF0E0   # Soft blue

function Format-Header($ws, $row, $startCol, $endCol, $bgColor) {
    $range = $ws.Range($ws.Cells.Item($row, $startCol), $ws.Cells.Item($row, $endCol))
    $range.Interior.Color = $bgColor
    $range.Font.Bold = $true
    $range.Font.Color = $ColorWhite
    $range.Font.Size = 11
    $range.Font.Name = "Segoe UI"
    $range.HorizontalAlignment = -4108
    $range.VerticalAlignment = -4108
    $range.RowHeight = 26
    $range.Borders.LineStyle = 1
    $range.Borders.Color = $ColorBorder
}

function Format-Data($ws, $startRow, $endRow, $startCol, $endCol) {
    $range = $ws.Range($ws.Cells.Item($startRow, $startCol), $ws.Cells.Item($endRow, $endCol))
    $range.Font.Name = "Segoe UI"
    $range.Font.Size = 9.5
    $range.VerticalAlignment = -4108
    $range.Borders.LineStyle = 1
    $range.Borders.Color = $ColorBorder
    $range.RowHeight = 20

    for ($r = $startRow; $r -le $endRow; $r++) {
        if ($r % 2 -eq 0) {
            $ws.Range($ws.Cells.Item($r, $startCol), $ws.Cells.Item($r, $endCol)).Interior.Color = 0xFAFAFA
        } else {
            $ws.Range($ws.Cells.Item($r, $startCol), $ws.Cells.Item($r, $endCol)).Interior.Color = 0xFFFFFF
        }
    }
}

# ==============================================================================
# 1. BUILD ENDPOINT INVENTORY EXCEL (endpoint-inventory.xlsx)
# ==============================================================================
Write-Host "Building endpoint-inventory.xlsx..." -ForegroundColor Yellow
$wbEnd = $excel.Workbooks.Add()
$wsEnd = $wbEnd.Worksheets.Item(1)
$wsEnd.Name = "Endpoint Inventory"
$wsEnd.Activate()
$wsEnd.Application.ActiveWindow.DisplayGridlines = $true

$wsEnd.Range("A1:G1").Merge()
$wsEnd.Range("A1:G1").Value2 = "MICROSUN MANAGEMENT - COMPLETE API & ENDPOINT INVENTORY"
$wsEnd.Range("A1:G1").Font.Size = 14
$wsEnd.Range("A1:G1").Font.Bold = $true
$wsEnd.Range("A1:G1").Font.Color = $ColorWhite
$wsEnd.Range("A1:G1").Interior.Color = $ColorDarkGreen
$wsEnd.Range("A1:G1").HorizontalAlignment = -4108
$wsEnd.Range("A1:G1").RowHeight = 32

$headersEnd = @("Endpoint Route", "HTTP Method", "Auth Required", "Expected Roles", "Controller / Handler", "Source File", "Endpoint Scope")
for ($i = 0; $i -lt $headersEnd.Length; $i++) {
    $wsEnd.Cells.Item(3, $i + 1) = $headersEnd[$i]
}
Format-Header $wsEnd 3 1 7 $ColorDarkGreen

$r = 4
foreach ($row in $data.endpoints) {
    for ($c = 0; $c -lt $row.Count; $c++) {
        $wsEnd.Cells.Item($r, $c + 1) = $row[$c]
    }
    $r++
}
$endRow1 = $r - 1
Format-Data $wsEnd 4 $endRow1 1 7

foreach ($w in $wbEnd.Worksheets) {
    $w.UsedRange.Columns.AutoFit() | Out-Null
    for ($col = 1; $col -le $w.UsedRange.Columns.Count; $col++) {
        $w.Columns.Item($col).ColumnWidth = [Math]::Min(55, [Math]::Max(14, $w.Columns.Item($col).ColumnWidth + 4))
    }
}

$endPath = Join-Path $outDir "endpoint-inventory.xlsx"
if (Test-Path $endPath) { Remove-Item $endPath -Force }
$wbEnd.SaveAs($endPath)
$wbEnd.Close($false)
Write-Host "Saved: $endPath" -ForegroundColor Green

# ==============================================================================
# 2. BUILD FINDINGS EXCEL (findings.xlsx)
# ==============================================================================
Write-Host "Building findings.xlsx..." -ForegroundColor Yellow
$wbFind = $excel.Workbooks.Add()
$wsFind = $wbFind.Worksheets.Item(1)
$wsFind.Name = "Security Findings"
$wsFind.Activate()
$wsFind.Application.ActiveWindow.DisplayGridlines = $true

$wsFind.Range("A1:G1").Merge()
$wsFind.Range("A1:G1").Value2 = "MICROSUN MANAGEMENT - SAST & DAST SECURITY AUDIT FINDINGS"
$wsFind.Range("A1:G1").Font.Size = 14
$wsFind.Range("A1:G1").Font.Bold = $true
$wsFind.Range("A1:G1").Font.Color = $ColorWhite
$wsFind.Range("A1:G1").Interior.Color = $ColorDarkGreen
$wsFind.Range("A1:G1").HorizontalAlignment = -4108
$wsFind.Range("A1:G1").RowHeight = 32

$headersFind = @("Finding ID", "Severity", "Vulnerability Title", "OWASP 2021", "CWE ID", "Source Location", "Remediation Strategy")
for ($i = 0; $i -lt $headersFind.Length; $i++) {
    $wsFind.Cells.Item(3, $i + 1) = $headersFind[$i]
}
Format-Header $wsFind 3 1 7 $ColorDarkGreen

$r = 4
foreach ($row in $data.findings) {
    for ($c = 0; $c -lt $row.Count; $c++) {
        $wsFind.Cells.Item($r, $c + 1) = $row[$c]
    }
    $r++
}
$endRow2 = $r - 1
Format-Data $wsFind 4 $endRow2 1 7

for ($r = 4; $r -le $endRow2; $r++) {
    $sev = $wsFind.Cells.Item($r, 2).Value2
    if ($sev -eq "High") {
        $wsFind.Cells.Item($r, 2).Interior.Color = $ColorHighRed
        $wsFind.Cells.Item($r, 2).Font.Bold = $true
    } elseif ($sev -eq "Medium") {
        $wsFind.Cells.Item($r, 2).Interior.Color = $ColorMedYellow
        $wsFind.Cells.Item($r, 2).Font.Bold = $true
    } else {
        $wsFind.Cells.Item($r, 2).Interior.Color = $ColorLowBlue
    }
    $wsFind.Cells.Item($r, 1).Font.Bold = $true
    $wsFind.Cells.Item($r, 1).HorizontalAlignment = -4108
    $wsFind.Cells.Item($r, 2).HorizontalAlignment = -4108
}

foreach ($w in $wbFind.Worksheets) {
    $w.UsedRange.Columns.AutoFit() | Out-Null
    for ($col = 1; $col -le $w.UsedRange.Columns.Count; $col++) {
        $w.Columns.Item($col).ColumnWidth = [Math]::Min(55, [Math]::Max(14, $w.Columns.Item($col).ColumnWidth + 4))
    }
}

$findPath = Join-Path $outDir "findings.xlsx"
if (Test-Path $findPath) { Remove-Item $findPath -Force }
$wbFind.SaveAs($findPath)
$wbFind.Close($false)
Write-Host "Saved: $findPath" -ForegroundColor Green

# ==============================================================================
# 3. BUILD TEST CASES EXCEL (test-cases.xlsx)
# ==============================================================================
Write-Host "Building test-cases.xlsx with $($data.testCases.Count) structured test cases..." -ForegroundColor Yellow
$wbTC = $excel.Workbooks.Add()
$wsTC = $wbTC.Worksheets.Item(1)
$wsTC.Name = "Test Cases (475+)"
$wsTC.Activate()
$wsTC.Application.ActiveWindow.DisplayGridlines = $true

$wsTC.Range("A1:J1").Merge()
$wsTC.Range("A1:J1").Value2 = "MICROSUN MANAGEMENT - 475+ STRUCTURED SECURITY & QA TEST CASES"
$wsTC.Range("A1:J1").Font.Size = 14
$wsTC.Range("A1:J1").Font.Bold = $true
$wsTC.Range("A1:J1").Font.Color = $ColorWhite
$wsTC.Range("A1:J1").Interior.Color = $ColorDarkGreen
$wsTC.Range("A1:J1").HorizontalAlignment = -4108
$wsTC.Range("A1:J1").RowHeight = 32

$headersTC = @("Test Case ID", "Category", "Test Title / Feature", "Test Objective", "Preconditions", "Test Steps", "Test Data / Payload", "Expected Result", "Severity", "Status")
for ($i = 0; $i -lt $headersTC.Length; $i++) {
    $wsTC.Cells.Item(3, $i + 1) = $headersTC[$i]
}
Format-Header $wsTC 3 1 10 $ColorDarkGreen

$r = 4
foreach ($row in $data.testCases) {
    for ($c = 0; $c -lt $row.Count; $c++) {
        $wsTC.Cells.Item($r, $c + 1) = $row[$c]
    }
    $r++
}
$endRow3 = $r - 1
Format-Data $wsTC 4 $endRow3 1 10

for ($r = 4; $r -le $endRow3; $r++) {
    $wsTC.Cells.Item($r, 1).Font.Bold = $true
    $wsTC.Cells.Item($r, 1).HorizontalAlignment = -4108
    $wsTC.Cells.Item($r, 2).HorizontalAlignment = -4108
    $wsTC.Cells.Item($r, 9).HorizontalAlignment = -4108
    $wsTC.Cells.Item($r, 10).HorizontalAlignment = -4108

    $wsTC.Cells.Item($r, 10).Interior.Color = $ColorPassGreen
    $wsTC.Cells.Item($r, 10).Font.Bold = $true

    $sev = $wsTC.Cells.Item($r, 9).Value2
    if ($sev -eq "High") {
        $wsTC.Cells.Item($r, 9).Interior.Color = $ColorHighRed
        $wsTC.Cells.Item($r, 9).Font.Bold = $true
    } elseif ($sev -eq "Medium") {
        $wsTC.Cells.Item($r, 9).Interior.Color = $ColorMedYellow
        $wsTC.Cells.Item($r, 9).Font.Bold = $true
    } else {
        $wsTC.Cells.Item($r, 9).Interior.Color = $ColorLowBlue
    }
}

foreach ($w in $wbTC.Worksheets) {
    $w.UsedRange.Columns.AutoFit() | Out-Null
    for ($col = 1; $col -le $w.UsedRange.Columns.Count; $col++) {
        $w.Columns.Item($col).ColumnWidth = [Math]::Min(60, [Math]::Max(14, $w.Columns.Item($col).ColumnWidth + 4))
    }
}

$tcPath = Join-Path $outDir "test-cases.xlsx"
if (Test-Path $tcPath) { Remove-Item $tcPath -Force }
$wbTC.SaveAs($tcPath)
$wbTC.Close($false)
Write-Host "Saved: $tcPath" -ForegroundColor Green

# ==============================================================================
# 4. BUILD MASTER 6-SHEET WORKBOOK
# ==============================================================================
Write-Host "Building Master Consolidated 6-Sheet Audit Workbook..." -ForegroundColor Yellow
$wbMaster = $excel.Workbooks.Add()

while ($wbMaster.Worksheets.Count -lt 6) {
    $wbMaster.Worksheets.Add([System.Reflection.Missing]::Value, $wbMaster.Worksheets.Item($wbMaster.Worksheets.Count)) | Out-Null
}

$ws1 = $wbMaster.Worksheets.Item(1)
$ws2 = $wbMaster.Worksheets.Item(2)
$ws3 = $wbMaster.Worksheets.Item(3)
$ws4 = $wbMaster.Worksheets.Item(4)
$ws5 = $wbMaster.Worksheets.Item(5)
$ws6 = $wbMaster.Worksheets.Item(6)

$ws1.Name = "Security Findings"
$ws2.Name = "Endpoint Inventory"
$ws3.Name = "Dependency Vulnerabilities"
$ws4.Name = "Performance Results"
$ws5.Name = "Risk Summary"
$ws6.Name = "Test Cases (475+)"

# Sheet 1: Security Findings
$ws1.Activate()
$ws1.Application.ActiveWindow.DisplayGridlines = $true
$ws1.Range("A1:G1").Merge()
$ws1.Range("A1:G1").Value2 = "SHEET 1: SECURITY FINDINGS (SAST & DAST)"
$ws1.Range("A1:G1").Font.Size = 14
$ws1.Range("A1:G1").Font.Bold = $true
$ws1.Range("A1:G1").Font.Color = $ColorWhite
$ws1.Range("A1:G1").Interior.Color = $ColorDarkGreen
$ws1.Range("A1:G1").HorizontalAlignment = -4108
$ws1.Range("A1:G1").RowHeight = 30

for ($i = 0; $i -lt $headersFind.Length; $i++) { $ws1.Cells.Item(3, $i + 1) = $headersFind[$i] }
Format-Header $ws1 3 1 7 $ColorDarkGreen
$r = 4
foreach ($row in $data.findings) {
    for ($c = 0; $c -lt $row.Count; $c++) { $ws1.Cells.Item($r, $c + 1) = $row[$c] }
    $r++
}
Format-Data $ws1 4 ($r - 1) 1 7

# Sheet 2: Endpoint Inventory
$ws2.Activate()
$ws2.Application.ActiveWindow.DisplayGridlines = $true
$ws2.Range("A1:G1").Merge()
$ws2.Range("A1:G1").Value2 = "SHEET 2: COMPLETE API & ENDPOINT INVENTORY"
$ws2.Range("A1:G1").Font.Size = 14
$ws2.Range("A1:G1").Font.Bold = $true
$ws2.Range("A1:G1").Font.Color = $ColorWhite
$ws2.Range("A1:G1").Interior.Color = $ColorDarkGreen
$ws2.Range("A1:G1").HorizontalAlignment = -4108
$ws2.Range("A1:G1").RowHeight = 30

for ($i = 0; $i -lt $headersEnd.Length; $i++) { $ws2.Cells.Item(3, $i + 1) = $headersEnd[$i] }
Format-Header $ws2 3 1 7 $ColorDarkGreen
$r = 4
foreach ($row in $data.endpoints) {
    for ($c = 0; $c -lt $row.Count; $c++) { $ws2.Cells.Item($r, $c + 1) = $row[$c] }
    $r++
}
Format-Data $ws2 4 ($r - 1) 1 7

# Sheet 3: Dependency Vulnerabilities
$ws3.Activate()
$ws3.Application.ActiveWindow.DisplayGridlines = $true
$ws3.Range("A1:F1").Merge()
$ws3.Range("A1:F1").Value2 = "SHEET 3: DEPENDENCY VULNERABILITIES & SECRETS AUDIT"
$ws3.Range("A1:F1").Font.Size = 14
$ws3.Range("A1:F1").Font.Bold = $true
$ws3.Range("A1:F1").Font.Color = $ColorWhite
$ws3.Range("A1:F1").Interior.Color = $ColorDarkGreen
$ws3.Range("A1:F1").HorizontalAlignment = -4108
$ws3.Range("A1:F1").RowHeight = 30

$headersDep = @("Check Category", "Tool / Standard", "Component Name", "Finding Details", "Severity", "Remediation")
for ($i = 0; $i -lt $headersDep.Length; $i++) { $ws3.Cells.Item(3, $i + 1) = $headersDep[$i] }
Format-Header $ws3 3 1 6 $ColorDarkGreen
$r = 4
foreach ($row in $data.dependencies) {
    for ($c = 0; $c -lt $row.Count; $c++) { $ws3.Cells.Item($r, $c + 1) = $row[$c] }
    $r++
}
Format-Data $ws3 4 ($r - 1) 1 6

# Sheet 4: Performance Results
$ws4.Activate()
$ws4.Application.ActiveWindow.DisplayGridlines = $true
$ws4.Range("A1:F1").Merge()
$ws4.Range("A1:F1").Value2 = "SHEET 4: PERFORMANCE & LOAD TESTING RESULTS (100 VU / 60S)"
$ws4.Range("A1:F1").Font.Size = 14
$ws4.Range("A1:F1").Font.Bold = $true
$ws4.Range("A1:F1").Font.Color = $ColorWhite
$ws4.Range("A1:F1").Interior.Color = $ColorDarkGreen
$ws4.Range("A1:F1").HorizontalAlignment = -4108
$ws4.Range("A1:F1").RowHeight = 30

$headersPerf = @("Performance Metric", "Faculty Benchmark", "Observed Test Result", "Factor", "Assessment", "Status")
for ($i = 0; $i -lt $headersPerf.Length; $i++) { $ws4.Cells.Item(3, $i + 1) = $headersPerf[$i] }
Format-Header $ws4 3 1 6 $ColorDarkGreen
$r = 4
foreach ($row in $data.performance) {
    for ($c = 0; $c -lt $row.Count; $c++) { $ws4.Cells.Item($r, $c + 1) = $row[$c] }
    $r++
}
Format-Data $ws4 4 ($r - 1) 1 6

# Sheet 5: Risk Summary
$ws5.Activate()
$ws5.Application.ActiveWindow.DisplayGridlines = $true
$ws5.Range("A1:E1").Merge()
$ws5.Range("A1:E1").Value2 = "SHEET 5: EXECUTIVE RISK SUMMARY & SCORECARD"
$ws5.Range("A1:E1").Font.Size = 14
$ws5.Range("A1:E1").Font.Bold = $true
$ws5.Range("A1:E1").Font.Color = $ColorWhite
$ws5.Range("A1:E1").Interior.Color = $ColorDarkGreen
$ws5.Range("A1:E1").HorizontalAlignment = -4108
$ws5.Range("A1:E1").RowHeight = 30

$headersRisk = @("Evaluation Category", "Rating Score", "Risk Level", "Key Driver", "Status")
for ($i = 0; $i -lt $headersRisk.Length; $i++) { $ws5.Cells.Item(3, $i + 1) = $headersRisk[$i] }
Format-Header $ws5 3 1 5 $ColorDarkGreen
$r = 4
foreach ($row in $data.risks) {
    for ($c = 0; $c -lt $row.Count; $c++) { $ws5.Cells.Item($r, $c + 1) = $row[$c] }
    $r++
}
Format-Data $ws5 4 ($r - 1) 1 5

# Sheet 6: Test Cases (475+)
$ws6.Activate()
$ws6.Application.ActiveWindow.DisplayGridlines = $true
$ws6.Range("A1:J1").Merge()
$ws6.Range("A1:J1").Value2 = "SHEET 6: COMPLETE STRUCTURED TEST CASES REPOSITORY (475+ TEST CASES)"
$ws6.Range("A1:J1").Font.Size = 14
$ws6.Range("A1:J1").Font.Bold = $true
$ws6.Range("A1:J1").Font.Color = $ColorWhite
$ws6.Range("A1:J1").Interior.Color = $ColorDarkGreen
$ws6.Range("A1:J1").HorizontalAlignment = -4108
$ws6.Range("A1:J1").RowHeight = 30

for ($i = 0; $i -lt $headersTC.Length; $i++) { $ws6.Cells.Item(3, $i + 1) = $headersTC[$i] }
Format-Header $ws6 3 1 10 $ColorDarkGreen

$r = 4
foreach ($row in $data.testCases) {
    for ($c = 0; $c -lt $row.Count; $c++) { $ws6.Cells.Item($r, $c + 1) = $row[$c] }
    $r++
}
$endRow6 = $r - 1
Format-Data $ws6 4 $endRow6 1 10

for ($r = 4; $r -le $endRow6; $r++) {
    $ws6.Cells.Item($r, 1).Font.Bold = $true
    $ws6.Cells.Item($r, 1).HorizontalAlignment = -4108
    $ws6.Cells.Item($r, 2).HorizontalAlignment = -4108
    $ws6.Cells.Item($r, 9).HorizontalAlignment = -4108
    $ws6.Cells.Item($r, 10).HorizontalAlignment = -4108

    $ws6.Cells.Item($r, 10).Interior.Color = $ColorPassGreen
    $ws6.Cells.Item($r, 10).Font.Bold = $true

    $sev = $ws6.Cells.Item($r, 9).Value2
    if ($sev -eq "High") {
        $ws6.Cells.Item($r, 9).Interior.Color = $ColorHighRed
        $ws6.Cells.Item($r, 9).Font.Bold = $true
    } elseif ($sev -eq "Medium") {
        $ws6.Cells.Item($r, 9).Interior.Color = $ColorMedYellow
        $ws6.Cells.Item($r, 9).Font.Bold = $true
    } else {
        $ws6.Cells.Item($r, 9).Interior.Color = $ColorLowBlue
    }
}

foreach ($w in $wbMaster.Worksheets) {
    $w.UsedRange.Columns.AutoFit() | Out-Null
    for ($col = 1; $col -le $w.UsedRange.Columns.Count; $col++) {
        $w.Columns.Item($col).ColumnWidth = [Math]::Min(60, [Math]::Max(14, $w.Columns.Item($col).ColumnWidth + 4))
    }
}

$ws1.Activate()

$masterPath1 = Join-Path $outDir "MICROSUN_SECURITY_AUDIT_MASTER.xlsx"
$masterPath2 = "c:\Users\unite\OneDrive\Desktop\PDD\MICROSUN_OFFICIAL_TEST_REPORT.xlsx"
$masterPath3 = "c:\Users\unite\OneDrive\Desktop\PDD\web_app\MICROSUN_OFFICIAL_TEST_REPORT.xlsx"

if (Test-Path $masterPath1) { Remove-Item $masterPath1 -Force }
$wbMaster.SaveAs($masterPath1)
Write-Host "Saved Master Security Audit Workbook: $masterPath1" -ForegroundColor Green

if (Test-Path $masterPath2) { Remove-Item $masterPath2 -Force }
$wbMaster.SaveCopyAs($masterPath2)
Write-Host "Updated Root Report: $masterPath2" -ForegroundColor Green

if (Test-Path $masterPath3) { Remove-Item $masterPath3 -Force }
$wbMaster.SaveCopyAs($masterPath3)
Write-Host "Updated Web App Report: $masterPath3" -ForegroundColor Green

$wbMaster.Close($false)
$excel.Quit()
[System.Runtime.InteropServices.Marshal]::ReleaseComObject($excel) | Out-Null

Write-Host ""
Write-Host "=================================================================" -ForegroundColor Green
Write-Host "  MASTER SECURITY AUDIT & 475+ TEST CASES EXCEL WORKBOOKS READY!" -ForegroundColor Yellow
Write-Host "=================================================================" -ForegroundColor Green
